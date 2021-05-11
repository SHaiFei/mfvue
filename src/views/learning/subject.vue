<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>在线学习</el-breadcrumb-item>
            <el-breadcrumb-item>综合统计</el-breadcrumb-item>
            <el-breadcrumb-item>课目统计</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">课目名称</span>
                    <el-select v-model="queryInfo.muluid" placeholder="请选择" clearable>
                        <el-option v-for='(item,index) in this.classificationList' :key='item.ID' :label="item.NAME" :value="item.ID" v-cloak>
                        </el-option>
                    </el-select>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search()">查询</el-button>
                </div>
            </el-row>
            <el-table stripe :data="tableData" style="width: 100%" @selection-change="tableDataSelect" @row-click="clickRow" ref="multipleTable">
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column prop="NAME" label="课目名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="YXX" label="已学习" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="WXX" label="未学习" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <div class="preview" @click="clickRow(scope.row)">查 看</div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>

            <!--  课件列表  -->
            <div v-if="courseware">
                <courseware :coursewareId="coursewareId"></courseware>
            </div>
        </div>
    </div>
</template>

<script>
import { subjectList } from '@/api/learning/regulations'
import { classification } from '@/api/examination/subject'

import courseware from './courseware'

export default {
    components: {
        courseware
    },
    data () {
        return {
            queryInfo: {
                pageSize: 5,
                pageNum: 1,
                muluid: ""
            },
            tableData: [],//表格数据
            total: 0,//分页总数
            rowData: [],
            classificationList: [], // 分类列表
            courseware: false,
            coursewareId: ""
        }
    },
    created () {
        this.getTableDataList() // 列表
        this.getClassification()
    },
    methods: {
        getTableDataList () { // 列表
            subjectList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        search () {  // 查询
            this.courseware = false
            this.getTableDataList()
        },
        getClassification () { // 课目分类
            classification().then(res => {
                if (res.code == 200) {
                    this.classificationList = res.data
                }
            })
        },
        clickRow (row, column, event) { //点击行
            this.coursewareId = row.ID
            this.courseware = true
        },
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        //点击分页
        handleCurrentChange (newPage) {  //分页当前页
            this.queryInfo.pageNum = newPage
            this.getTableDataList()
        },
        handleSizeChange (newSize) {   //分页每页显示条数
            this.queryInfo.pageSize = newSize
            this.getTableDataList()
        },
    },
};
</script>
<style lang="less" scoped>
.dialogForm .el-select {
    width: 100%;
}
.el-form-item {
    margin-left: 5px;
}
.el-select,
.el-input--suffix {
    width: 200px;
}
</style>
