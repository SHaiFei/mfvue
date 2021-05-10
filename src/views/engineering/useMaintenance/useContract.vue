<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>使用管理</el-breadcrumb-item>
            <el-breadcrumb-item>使用合同</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">所属区</span>
                    <el-select clearable class="elinput200" v-model="queryInfo">
                        <el-option v-for='(item,index) in tableData' :key='item.id' :label="item.label" :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="font-12 spanText">合同名称</span>
                    <el-input v-model="queryInfo.contractName" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <!-- <el-button type="primary" size="small" icon="el-icon-view" @click="">查看</el-button> -->
                    <el-button type="primary" size="small" icon="el-icon-download" @click="download">下载</el-button>
                </div>
            </el-row>
            <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="county" label="所属区" align="center"></el-table-column>
                <el-table-column prop="contractName" label="合同名称" align="center"></el-table-column>
                <el-table-column prop="signDate" label="签订日期" align="center"></el-table-column>
                <el-table-column prop="partyA" label="甲方名称" align="center"></el-table-column>
                <el-table-column prop="partyB" label="乙方名称" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { usecontractList } from '@/api/engineering/security/usecontract'


export default {
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                contractName: ""
            },
            tableData: [],//数据
            total: 0,//分页总数
            rowData: [],
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 列表
            usecontractList(this.queryInfo).then(res => {
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
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        download () { // 下载
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            }
            if (this.rowData[0].fileId == null) {
                return this.msgError("此方案没有附件")
            }
            location.href = this.GLOBAL.download_URL + "/downloadFile?fileId=" + this.rowData[0].fileId
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
