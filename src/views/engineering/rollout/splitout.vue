<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>工程转出</el-breadcrumb-item>
            <el-breadcrumb-item>拆除移出</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">接收单位</span>
                    <el-input v-model="queryInfo.receUnit" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
            </el-row>
            <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px">
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="receUnit" label="接收单位" align="center"></el-table-column>
                <el-table-column prop="underNum" label="工程数量" align="center"></el-table-column>
                <el-table-column prop="ydate" label="移交时间" align="center"></el-table-column>
                <!-- <el-table-column prop="ADDRESS" label="操作" align="center"></el-table-column> -->
                <el-table-column prop="" label="操作" align="center">
                    <template slot-scope="scope">
                        <div class="preview" @click="clickRow(scope.row)">
                            查 看
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>

            <div v-if="isCentralOrganTable">
                <centralOrganTable :centralOrgan="centralOrgan"></centralOrganTable>
            </div>
        </div>
    </div>
</template>

<script>
import { splitoutList} from '@/api/engineering/security/centralOrgan'

import centralOrganTable from "./centralOrgan/centralOrganTable"

export default {
    components:{
        centralOrganTable
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 5,
                pageNum: 1,
                receUnit: ""
            },
            tableData: [],//数据
            total: 0,//分页总数
            centralOrgan: null,
            isCentralOrganTable: false
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            splitoutList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        search () {
            this.queryInfo.pageNum = 1
            this.getTableDataList()
        },
        clickRow (row, column, event) { //点击行
            this.centralOrgan = row
            this.isCentralOrganTable = true
        },
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
