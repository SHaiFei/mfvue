<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>在线考试</el-breadcrumb-item>
            <el-breadcrumb-item>已考试</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">试卷名称</span>
                    <el-input v-model="queryInfo.name" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
            </el-row>
            <el-table :data="tableData" stripe style="width:100%;margin-top: 10px;" @row-click="clickRow" @selection-change='tableDataSelect' ref="multipleTable">
                <!-- <el-table-column type="selection" width="50" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="NAME" label="试卷名称" align="center"></el-table-column>
                <el-table-column prop="SUBJECTNAME" label="科目名称" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="TIME" label="考试时长(分钟)" align="center"></el-table-column>
                <el-table-column prop="RN" label="试题数量" align="center"></el-table-column>
                <el-table-column prop="GRADE" label="试卷总分" align="center"></el-table-column>
                <el-table-column prop="GRADEI" label="及格分数" align="center"></el-table-column>
                <el-table-column prop="DEFEN" label="考试得分" align="center"></el-table-column>
                <el-table-column prop="CREATE_TIME" label="考试时间" align="center">
                    <template slot-scope="scope">
                        {{ parseTime(scope.row.CREATE_TIME) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="success" @click="results(scope.row)">
                            查看结果
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { resultsList } from '@/api/examination/selftest'
export default {
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
            },
            tableData: [],//数据
            total: 0,//分页总数
            rowData: []
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            resultsList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        search () {
            this.getTableDataList()
        },
        results (row) {
            let params = {
                id: row.ID,
                exampaperdajuanId: row.EXAMPAPERDAJUANID,
                state: 'results'
            }
            this.$router.push({ path: '/examination/preview', query: { res: JSON.stringify(params) } })
        },
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        clickRow (row) { //点击行
            this.$refs.multipleTable.toggleRowSelection(row)
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
    }
};
</script>
<style lang="less" scoped>
// .elRow {
//     margin-top: 10px;
// }
.el-select,
.el-input {
    width: 200px;
}
</style>
