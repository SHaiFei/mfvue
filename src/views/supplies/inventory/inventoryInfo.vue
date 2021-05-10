<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>物资仓储</el-breadcrumb-item>
            <el-breadcrumb-item>盘点及阈值管理</el-breadcrumb-item>
            <el-breadcrumb-item>物资库存信息</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">所属单位</span>
                    <treeselect ref="headerChild" />
                    <!-- <el-input v-model="queryInfo.danwei" clearable class="elinput200"></el-input> -->
                    <span class="font-12 spanText">物资仓库</span>
                    <el-input v-model="queryInfo.storename" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">物资类别</span>
                    <el-input v-model="queryInfo.categoriesname" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">物资名称</span>
                    <el-input v-model="queryInfo.name" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-download" @click="download">导出</el-button>
                </div>
            </el-row>
            <el-table stripe :data="tableData" style="width: 100%" @selection-change="tableDataSelect" @row-click="clickRow" ref="multipleTable">
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column prop="deptname" label="所属单位" align="center"></el-table-column>
                <el-table-column prop="name" label="物资名称" align="center"></el-table-column>
                <el-table-column prop="model" label="型号" align="center"></el-table-column>
                <el-table-column prop="jldw" label="单位" align="center"></el-table-column>
                <el-table-column prop="categoriesname" label="类别" align="center"></el-table-column>
                <el-table-column prop="storename" label="物资仓库" align="center"></el-table-column>
                <el-table-column prop="quantity" label="库存数量" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>

import { tableDataList, exportData, } from "@/api/supplies/inventory/inventoryInfo"

import treeselect from "@/components/treeselect"
export default {
    components: {
        treeselect
    },
    data () {
        return {
            tableData: [],
            total: 0, //分页总数
            queryInfo: {
                pageNum: 1,
                pageSize: 10,
                deptid: "",
                storename: "",
                categoriesname: "",
                name: ""
            },
            rowData: []
        };
    },
    created () {
        this.getTableDataList();
    },
    methods: {
        getTableDataList () { // 获取列表数据
            tableDataList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                    this.total = res.total
                }
            })
        },
        download(){ //  导出
            // window.location.href = this.GLOBAL.download_URL + "wz/info/export"
            exportData().then(res => {
                if (res.code == 200){
                    window.location.href = this.GLOBAL.download_URL + "/common/download?fileName="+res.msg
                }
            })
        },
        search () { // 查询
            this.queryInfo.deptid = this.$refs.headerChild.department
            this.queryInfo.pageNum = 1;
            this.getTableDataList()
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
        tableDataSelect(){

        },
        clickRow(){

        }
    },
};
</script>
<style lang="less" scoped>
.el-dialog-div {
    height: 60vh;
    overflow: auto;
}
.el-table {
    margin-top: 10px;
}
</style>
