<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>维护维修</el-breadcrumb-item>
            <el-breadcrumb-item>进度管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">所属区</span>
                    <areaCom ref="areaCom" class="elinput200"></areaCom>
                    <span class="font-12 spanText">年份</span>
                    <el-date-picker v-model="queryInfo.rYear" clearable class="elinput200" type="year" placeholder="选择日期" value-format="yyyy">
                    </el-date-picker>
                    <span class="font-12 spanText">月</span>
                    <el-input v-model="queryInfo.monthly" class="elinput200" clearable></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
            </el-row>
            <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px">
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="county" label="所属区" align="center"></el-table-column>
                <el-table-column prop="rYear" label="年份" align="center"></el-table-column>
                <el-table-column prop="monthly" label="月" align="center"></el-table-column>
                <el-table-column prop="planPnumber" label="全年计划工程数" align="center"></el-table-column>
                <el-table-column prop="finishPnumber" label="当前完成工程数" align="center"></el-table-column>
                <el-table-column prop="ratio" label="完成比例" align="center"></el-table-column>
                <el-table-column prop="editTime" label="填报时间" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { tableDataList } from '@/api/engineering/maintenance/progress'

import areaCom from '@/components/area'
export default {
    components: {
        areaCom
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                rYear: "",
            },
            tableData: [],//数据
            total: 0,//分页总数
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        search () {
            this.queryInfo.county = this.$refs.areaCom.areaVal
            this.getTableDataList()
        },
        getTableDataList () { // 题库维护列表
            tableDataList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
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
.dialogForm .el-select {
    width: 100%;
}
.el-form-item {
    margin-left: 5px;
}
</style>
