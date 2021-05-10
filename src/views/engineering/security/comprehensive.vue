<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>安全管理</el-breadcrumb-item>
            <el-breadcrumb-item>综合治理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">所属区</span>
                    <el-select clearable class="elinput200" v-model="queryInfo">
                        <el-option v-for='(item,index) in tableData' :key='item.id' :label="item.label" :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="font-12 spanText">资料名称</span>
                    <el-input v-model="queryInfo.dataName" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                    <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                    <!-- <el-button type="primary" size="small" icon="el-icon-view" @click="edit">查看</el-button> -->
                    <el-button type="primary" size="small" icon="el-icon-download" @click="download">下载</el-button>
                </div>
            </el-row>
            <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @row-click="clickRow" @selection-change='tableDataSelect'>
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="county" label="所属区" align="center"></el-table-column>
                <el-table-column prop="dataName" label="资料名称" align="center"></el-table-column>
                <el-table-column prop="dataType" label="资料类型" align="center"></el-table-column>
                <el-table-column prop="noter" label="存档人" align="center"></el-table-column>
                <el-table-column prop="archiveDate" label="归档日期" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="35%" :close-on-click-modal="false" class="dialogForm">
            <comprehensiveForm v-if="status == 'add'" @closeDialog="closeDialog"></comprehensiveForm>
            <comprehensiveForm v-else :rowData="rowData" @closeDialog="closeDialog"></comprehensiveForm>
        </el-dialog>
    </div>
</template>

<script>
import { tableDataList, comprehensiveDel } from '@/api/engineering/security/comprehensive'

import comprehensiveForm from "./comprehensiveForm"

export default {
    components: {
        comprehensiveForm
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                dataName: "",
                county: ""
            },
            tableData: [],//数据
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            rowData: [],
            status: "",
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
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
        add () { // 添加
            this.status = "add"
            this.title = "新增"
            this.dialogFormVisible = true
        },
        edit () { //  修改
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.status = "edit"
                this.title = "修改"
                this.dialogFormVisible = true
            }
        },
        clickRow (row, column, event) { //点击行

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
