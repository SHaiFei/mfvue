<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>使用管理</el-breadcrumb-item>
            <el-breadcrumb-item>服务对象</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">单位名称</span>
                    <el-input v-model="queryInfo.unitName" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">单位地址</span>
                    <el-input v-model="queryInfo.address" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">所属区</span>
                    <el-input v-model="queryInfo.unitType" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">工程编号</span>
                    <el-input v-model="queryInfo.underCode" clearable class="elinput200"></el-input>
                    <!-- <span class="font-12 spanText">工程地址</span>
                    <el-input v-model="queryInfo.address" clearable class="elinput200"></el-input> -->
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <!-- <el-button type="primary" size="small" icon="el-icon-view" @click="">查看</el-button> -->
                    <el-button type="primary" size="small" icon="el-icon-download" @click="download">导出</el-button>
                </div>
            </el-row>
            <el-table :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
                <!-- <el-table-column type="selection" width="50" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="unitName" label="单位名称" align="center"></el-table-column>
                <el-table-column prop="address" label="单位地址" align="center"></el-table-column>
                <el-table-column prop="underCode" label="工程编号" align="center"></el-table-column>
                <el-table-column prop="underName" label="工程名称" align="center"></el-table-column>
                <el-table-column prop="peacetmeUse" label="平时用途" align="center"></el-table-column>
                <el-table-column prop="unitType" label="单位类型" align="center"></el-table-column>
                <el-table-column prop="legalPerson" label="联系人" align="center"></el-table-column>
                <el-table-column prop="legalPerPhone" label="联系电话" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { serviceList, serviceExport } from '@/api/engineering/security/usecontract'

export default {
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                address: "",
                unitName: "",
                underCode: ""
            },
            tableData: [],//数据
            total: 0,//分页总数
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            serviceList(this.queryInfo).then(res => {
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
        download(){
            serviceExport().then(res => {
                if (res.code == 200){
                    location.href = this.GLOBAL.download_URL + "/common/download?fileName=" + res.msg
                } else {
                    this.msgError(res.msg)
                }
            })
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
