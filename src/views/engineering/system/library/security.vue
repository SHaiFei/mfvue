<template>
    <div class="all-data-detail">
        <el-row class="elRow">
            <div class="elRowLeft">
                <span class="font-12 spanText">责任部门</span>
                <resDepartment ref="department" class="elinput200"></resDepartment>
                <!-- <el-select clearable class="elinput200" v-model="departmentVal">
                        <el-option v-for="item in department" :key="item.id" :value="item.id" :label="item.label"></el-option>
                    </el-select> -->
                <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
            </div>
            <div class="buttons">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
            </div>
        </el-row>
        <el-table :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
            <el-table-column prop="content" label="检查内容" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="spotBasis" label="检查依据" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.spotBasis == '1'">权利清单</div>
                    <div v-if="scope.row.spotBasis == '2'">内部检测</div>
                </template>
            </el-table-column>
            <el-table-column prop="department" label="责任部门" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.department == '1'">民防</div>
                    <div v-if="scope.row.department == '2'">消防</div>
                    <div v-if="scope.row.department == '3'">公安</div>
                    <div v-if="scope.row.department == '4'">卫生</div>
                </template>
            </el-table-column>
            <el-table-column prop="dispose" label="处理方案" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.dispose == '1'">停止使用</div>
                    <div v-if="scope.row.dispose == '2'">停业整顿</div>
                    <div v-if="scope.row.dispose == '3'">期限整改</div>
                </template>
            </el-table-column>
        </el-table>
        <div class="all-block-pager">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%" :close-on-click-modal="false">
            <securityForm v-if="status == 'add'" @closeDialog="closeDialog"></securityForm>
            <securityForm v-else :rowData="rowData" @closeDialog="closeDialog"></securityForm>
        </el-dialog>
    </div>
</template>

<script>
import { securityList, securityDel } from '@/api/engineering/system/library'

import resDepartment from "@/components/resDepartment"
import securityForm from "./securityForm"
export default {
    components: {
        securityForm, resDepartment
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
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
            securityList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        search () {
            this.queryInfo.department = this.$refs.department.departmentVal
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
                        securityDel(this.rowData[0].ckiId).then(res => {
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
.el-select {
    width: 100%;
    display: inline-block;
}
.el-form-item {
    margin-left: 5px;
}
</style>
