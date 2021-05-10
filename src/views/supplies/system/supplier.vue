<template>
    <!-- 供应商管理 -->
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>物资仓储</el-breadcrumb-item>
            <el-breadcrumb-item>系统维护</el-breadcrumb-item>
            <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">所属单位</span>
                    <treeselect ref="headerChild" />
                    <span class="font-12 spanText">供应商名称</span>
                    <el-input v-model="queryInfo.supplierName" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">联系人</span>
                    <el-input v-model="queryInfo.contacts" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">联系人电话</span>
                    <el-input v-model="queryInfo.telphone" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="add">新增</el-button>
                    <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="search">删除</el-button>
                </div>
            </el-row>

            <el-table stripe :data="tableData" style="width: 100%" @selection-change="tableDataSelect" ref="multipleTable">
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column prop="orgShortName" label="所属单位" align="center"></el-table-column>
                <el-table-column prop="supplierName" label="供应商名称" align="center"></el-table-column>
                <el-table-column prop="leadName" label="单位负责人" align="center"></el-table-column>
                <el-table-column prop="leadPhone" label="负责人电话" align="center"></el-table-column>
                <el-table-column prop="contacts" label="联系人" align="center"></el-table-column>
                <el-table-column prop="telphone" label="联系人电话" align="center"></el-table-column>
                <el-table-column prop="emails" label="邮箱" align="center"></el-table-column>
                <el-table-column prop="business" label="主营业务" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%" :close-on-click-modal="false">
            <supplier @closeDialogFormVisible="closeDialog"></supplier>
        </el-dialog>
    </div>
</template>

<script>
import { tableDataList } from "@/api/supplies/system/supplier"

import treeselect from "@/components/treeselect";
import supplier from "./supplier/supplierForm"
export default {
    components: {
        supplier, treeselect
    },
    data () {
        return {
            tableData: [],
            total: 0, //分页总数
            dialogFormVisible: false,
            title: "",
            queryInfo: {
                pageNum: 1,
                pageSize: 10,
                telphone: "",
                supplierName: "",
                contacts: "",
            },
            rowData: [],
            status: "",
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
            this.status = "add"
            this.title = "新增"
            this.dialogFormVisible = true
        },
        edit () {
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.status = "edit"
                this.title = "修改"
                this.dialogFormVisible = true
            }
        },
        del (){
            if (this.rowData.length == 0) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                let params = []
                this.rowData.forEach(item => {
                    params.push(item.id)
                })
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {
                        shelvesDel(params).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    }
                }).catch(e => e)
            }
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
            this.queryInfo.orgid = this.$refs.headerChild.department
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
