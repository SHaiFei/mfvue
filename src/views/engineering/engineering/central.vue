<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>工程转入</el-breadcrumb-item>
            <el-breadcrumb-item>中央机关转入</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">所属区</span>
                    <areaCom ref="areaCom" class="elinput200"></areaCom>
                    <span class="font-12 spanText">接收单位</span>
                    <el-input v-model="queryInfo.receUnit" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="add">新增</el-button>
                    <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                    <el-button type="primary" size="small" icon="el-icon-download" @click="download">下载</el-button>
                </div>
            </el-row>
            <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @row-click="clickRow" @selection-change='tableDataSelect'>
                <el-table-column type="selection" label="" width="50px" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="receUnit" label="接收单位" align="center"></el-table-column>
                <el-table-column prop="tranUnit" label="移交单位" align="center"></el-table-column>
                <el-table-column prop="underNum" label="工程数量" align="center"></el-table-column>
                <el-table-column prop="ydate" label="移交时间" align="center"></el-table-column>
                <el-table-column prop="" label="操作" align="center">
                    <template slot-scope="scope">
                        <span  class="preview" @click="clickRow(scope.row)">
                            查 看
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="queryInfo.pageSize" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>

            <!-- 查看内容 -->
            <div v-if="isShow" style="margin-top: 15px">
                <centralTable :documentAcceId="documentAcceId"></centralTable>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%" :close-on-click-modal="false" class="dialogForm">
            <centralForm v-if="status == 'add'" @closeDialog="closeDialog"></centralForm>
            <centralForm v-else :rowData="rowData" @closeDialog="closeDialog"></centralForm>
        </el-dialog>
    </div>
</template>

<script>
import { centralList } from '@/api/engineering/engineering/central'

import areaCom from '@/components/area'
import centralForm from './central/centralForm'
import centralTable from './central/centralTable'
export default {
    components: {
        areaCom, centralForm, centralTable
    },
    data () {
        return {
            isShow: false,
            queryInfo: { // 分页
                pageSize: 5,
                pageNum: 1,
                receUnit: ""
            },
            tableData: [],//数据
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            form: {
            },
            formRules: {
                tips: [{ required: true, message: "请输入试题解析", trigger: "blur", },],
                content: [{ required: true, message: "请输入试题题干", trigger: "blur", },],
                type: [{ required: true, message: "请选择试题类型", trigger: "blur", },],
            },
            rowData: [],
            status: "",
            documentAcceId: "",
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            centralList(this.queryInfo).then(res => {
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
        clickRow (row) {
            this.isShow = true
            this.documentAcceId = row.documentAcceId
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
        tableDataSelect (val) {
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
