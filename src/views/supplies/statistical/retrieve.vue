<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>物资仓储</el-breadcrumb-item>
            <el-breadcrumb-item>统计与检索</el-breadcrumb-item>
            <el-breadcrumb-item>按条件检索</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">所属单位</span>
                    <treeselect ref="headerChild" />
                    <span class="font-12 spanText">所属物资库</span>
                    <el-input v-model="queryInfo.storename" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">物资类别</span>
                    <el-input v-model="queryInfo.categoriesname" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">时间</span>
                    <el-date-picker
                        v-model="queryInfo.operatedate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        class="elinput2001">
                    </el-date-picker>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <!-- <el-button type="primary" size="small" icon="el-icon-plus" @click="add">新增</el-button>
                    <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="search">删除</el-button> -->
                </div>
            </el-row>
            <!--  -->
            <el-table stripe :data="tableData" style="width: 100%" @selection-change="tableDataSelect" @row-click="clickRow" ref="multipleTable">
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column prop="code" label="物资编码" align="center"></el-table-column>
                <el-table-column prop="name" label="物资名称" align="center"></el-table-column>
                <el-table-column prop="jldw" label="单位" align="center"></el-table-column>
                <el-table-column prop="quantity" label="库存数量" align="center"></el-table-column>
                <el-table-column prop="categoriesname" label="类别" align="center"></el-table-column>
                <el-table-column prop="storename" label="所属物资库" align="center"></el-table-column>
                <el-table-column prop="deptname" label="所属单位" align="center"></el-table-column>
                <el-table-column prop="remark" label="备注" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="35%" :close-on-click-modal="false">
        </el-dialog>
    </div>
</template>

<script>
import { tableDataList, } from "@/api/supplies/statistical/retrieve";
import treeselect from "@/components/treeselect";
export default {
    components: {
        treeselect
    },
    data () {
        return {
            tableData: [],
            total: 0, //分页总数
            dialogFormVisible: false,
            title: "",
            form: {
                navigation: "",
                lawTypeChinese: "",
                publicYear: "",
                lawName: ""
            },
            queryInfo: {
                pageNum: 1,
                pageSize: 10,
                deptid:"",

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
            this.queryInfo.deptid = this.$refs.headerChild.department
            this.getTableDataList()
        },
        closeDialog(){
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
