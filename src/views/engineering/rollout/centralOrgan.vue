<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>工程转出</el-breadcrumb-item>
            <el-breadcrumb-item>转至中央机关</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">接收单位</span>
                    <el-input v-model="queryInfo.receUnit" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                    <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                    <el-button type="primary" size="small" icon="el-icon-download" @click="download">下载</el-button>
                </div>
            </el-row>
            <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="receUnit" label="接收单位" align="center"></el-table-column>
                <el-table-column prop="tranUnit" label="移交单位" align="center"></el-table-column>
                <el-table-column prop="underNum" label="工程数量" align="center"></el-table-column>
                <el-table-column prop="ydate" label="移交时间" align="center"></el-table-column>
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

            <!--  课件列表  -->
            <div v-if="isCentralOrganTable">
                <centralOrganTable :centralOrgan="centralOrgan"></centralOrganTable>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="35%" :close-on-click-modal="false" class="dialogForm">
            <centralOrganForm v-if="status == 'add'" :formType="formType" @closeDialog="closeDialog"></centralOrganForm>
            <centralOrganForm v-else :rowData="rowData" :formType="formType" @closeDialog="closeDialog"></centralOrganForm>
        </el-dialog>
    </div>
</template>

<script>
import { centralOrganList } from '@/api/engineering/security/centralOrgan'

import centralOrganTable from "./centralOrgan/centralOrganTable"
import centralOrganForm from "./centralOrgan/centralOrganForm"

export default {
    components: {
        centralOrganTable, centralOrganForm
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                receUnit: ""
            },
            tableData: [],//数据
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            rowData: [],
            centralOrgan: null,
            isCentralOrganTable: false,
            formType: ''
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            centralOrganList(this.queryInfo).then(res => {
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
        add () { // 添加
            this.status = "add"
            this.title = "新增"
            this.formType = 'centralOrgan'
            this.dialogFormVisible = true
        },
        edit () { //  修改
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.status = "edit"
                this.title = "修改"
                this.formType = 'centralOrgan'
                this.dialogFormVisible = true
            }
        },
        clickRow (row, column, event) { //点击行
            this.centralOrgan = row
            this.isCentralOrganTable = true
        },
        del () { // 题库列表删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {
                        comprehensiveDel(this.rowData[0].datId).then(res => {
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
            this.rowData.type = 'centralOrgan'
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        download () {
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            }
            if (this.rowData[0].fileId == null) {
                return this.msgError("此方案没有附件")
            }
            location.href = this.GLOBAL.download_URL + "/downloadFile?fileId=" + this.rowData[0].fileId
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
