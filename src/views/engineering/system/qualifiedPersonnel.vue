<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>系统维护</el-breadcrumb-item>
            <el-breadcrumb-item>资质人员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">姓名</span>
                    <el-input v-model="queryInfo.name" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">职务</span>
                    <el-input v-model="queryInfo.duty" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">执法证号</span>
                    <el-input v-model="queryInfo.zfzh" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">所属区</span>
                    <areaCom ref="areaCom" class="elinput200"></areaCom>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                    <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                </div>
            </el-row>
            <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="unitId" label="所属区" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.sex == 'F'">女</div>
                        <div v-if="scope.row.sex == 'M'">男</div>
                    </template>
                </el-table-column>
                <el-table-column prop="duty" label="职务" align="center"></el-table-column>
                <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                <el-table-column prop="zfzh" label="执法证号" align="center"></el-table-column>
                <el-table-column prop="telephone" label="固定电话" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%" :close-on-click-modal="false" class="dialogForm">
            <qualifiedPersonnelForm v-if="status == 'add'" @closeDialog="closeDialog"></qualifiedPersonnelForm>
            <qualifiedPersonnelForm v-else :rowData="rowData" @closeDialog="closeDialog"></qualifiedPersonnelForm>
        </el-dialog>
    </div>
</template>

<script>
import { quapersonList, quapersonDel } from '@/api/engineering/system/public'

import qualifiedPersonnelForm from "./qualifiedPersonnel/qualifiedPersonnelForm"
import areaCom from "@/components/area"

export default {
    components: {
        qualifiedPersonnelForm, areaCom
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                zfzh: "",
                name: "",
                duty: "",
            },
            tableData: [],//数据
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            rowData: [],
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            quapersonList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        search () {
            this.queryInfo.unitId = this.$refs.areaCom.areaVal
            this.queryInfo.pageNum = 1
            this.getTableDataList()
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
        del () { // 题库列表删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {
                        quapersonDel(this.rowData[0].id).then(res => {
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
