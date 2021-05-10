<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>物资仓储</el-breadcrumb-item>
            <el-breadcrumb-item>系统维护</el-breadcrumb-item>
            <el-breadcrumb-item>物资类别管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table stripe :data="tableData" style="width: 100%" @selection-change="tableDataSelect" @row-click="clickRow" ref="multipleTable">
            <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
            <el-table-column prop="deptname" label="所属单位" align="center"></el-table-column>
            <el-table-column prop="name" label="物资名称" align="center"></el-table-column>
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
</template>


<script>
import { tableDataList, } from "@/api/supplies/system/suppliesType";

export default {
    data () {
        return {
            tableData: [],
            total: 0, //分页总数
            form: {
                navigation: "",
                lawTypeChinese: "",
                publicYear: "",
                lawName: ""
            },
            queryInfo: {
                pageNum: 1,
                pageSize: 10
            },
            rowData: []
        }
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
        add () {
            this.title = "添加"
            this.dialogFormVisible = true
        },
        edit () {
            this.title = "修改"
            this.dialogFormVisible = true
        },
        clickRow (row, column, event) { //点击行

        },
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        search () { //查询
            this.queryInfo.pageNum = 1;
            this.getTableDataList()
        },
        closeDialog () {
            this.dialogFormVisible = false
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
}
</script>


<style lang='scss' scoped>
</style>
