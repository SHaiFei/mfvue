<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>物资仓储</el-breadcrumb-item>
            <el-breadcrumb-item>基本信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>物资基本信息管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">所属单位</span>
                    <treeselect ref="headerChild" />

                    <span class="font-12 spanText">物资类别</span>
                    <el-select class="elinput200" clearable v-model="queryInfo.categoriesid">
                        <el-option v-for="item in categoriesList" :key="item.ID" :value="item.ID" :label="item.NAME">
                        </el-option>
                    </el-select>
                    <!-- <el-input v-model="queryInfo.categoriesid" clearable class="elinput200"></el-input> -->
                    <span class="font-12 spanText">物资名称</span>
                    <el-input v-model="queryInfo.name" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                    <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                </div>
            </el-row>
            <el-table stripe :data="tableData" style="width: 100%" @selection-change="tableDataSelect" @row-click="clickRow" ref="multipleTable">
                <el-table-column type="selection" align="center" width="50"></el-table-column>
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column show-overflow-tooltip prop="deptname" label="所属单位" align="center"></el-table-column>
                <el-table-column show-overflow-tooltip prop="name" label="物资名称" align="center"></el-table-column>
                <el-table-column show-overflow-tooltip prop="model" label="型号" align="center"></el-table-column>
                <el-table-column show-overflow-tooltip prop="categoriesname" label="物资类别" align="center"></el-table-column>
                <el-table-column prop="batch" label="批次" align="center"></el-table-column>
                <el-table-column prop="quantity" label="初始数量" align="center"></el-table-column>
                <el-table-column show-overflow-tooltip prop="jldw" label="单位" align="center"></el-table-column>
                <el-table-column prop="shelfname" label="所属货架" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="50%" :close-on-click-modal="false">
            <suppliesForm v-if="status == 'add'" @closeDialog="closeDialog"></suppliesForm>
            <suppliesForm v-else :rowData="rowData" @closeDialog="closeDialog"></suppliesForm>
        </el-dialog>
    </div>
</template>

<script>
import { tableDataList, suppilesType, suppilesDel } from "@/api/supplies/supplies"
import { deptList } from '@/api/examination/selftest'
// form 表单组件
import suppliesForm from "./supplies/suppliesForm"

import treeselect from "@/components/treeselect";
export default {
    components: {
        suppliesForm, treeselect
    },
    data () {
        return {
            tableData: [],
            total: 0, //分页总数
            dialogFormVisible: false,
            title: "",
            form: {
                navigation: "法律法规",
                lawTypeChinese: "国家",
                publicYear: "",
                lawName: ""
            },
            queryInfo: {
                pageNum: 1,
                pageSize: 10,
                categoriesid: "",
                name: "",
                deptid: ""
            },
            rowData: [],
            status: "",
            categoriesList: [] // 物资类别列表
        };
    },
    created () {
        this.getTableDataList()
        this.getSuppliesType()
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
        getSuppliesType () { // 获取物资类型
            suppilesType().then(res => {
                if (res.code == 200) {
                    this.categoriesList = res.data
                }
            })
        },
        add () {
            this.title = "添加"
            this.status = "add"
            this.dialogFormVisible = true
        },
        edit () {
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            }
            this.status = "edit"
            this.title = "修改"
            this.dialogFormVisible = true
        },
        del () { // 题库列表删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {
                        let ids = []
                        ids.push(this.rowData[0].id)
                        suppilesDel(ids).then(res => {
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
            this.queryInfo.deptid = this.$refs.headerChild.department
            this.queryInfo.pageNum = 1
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
.treeselect {
    width: 200px;
    display: inline-block;
    top: 13px;
}
::v-deep .vue-treeselect__input-container {
    height: 29px !important;
}
</style>
