<template>
    <!-- 抢险队伍 -->
    <div class="all-data-detail">
        <el-row class="elRow">
            <div class="elRowLeft">
                <span class="font-12 spanText">单位名称</span>
                <el-input v-model="queryInfo.affiliation" clearable class="elinput200"></el-input>
                <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
            </div>
            <div class="buttons">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                <!-- <el-button type="primary" size="small">查看</el-button> -->
            </div>
        </el-row>
        <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
            <el-table-column prop="area" label="队伍性质" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.nature == '1'">专业抢险队伍</div>
                    <div v-if="scope.row.nature == '2'">驻地部队抢险队伍</div>
                    <div v-if="scope.row.nature == '3'">其他抢险队伍</div>
                </template>
            </el-table-column>
            <el-table-column prop="affiliation" label="单位名称" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="抢险队伍名称" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="population" label="队伍人数" align="center"></el-table-column>
            <el-table-column prop="principal" label="队伍负责人" align="center"></el-table-column>
            <el-table-column prop="handset" label="联系方式" align="center"></el-table-column>
            <el-table-column label="单位负责人" align="center">
                <el-table-column prop="unitPrincipal" label="姓名" align="center">
                </el-table-column>
                <el-table-column prop="dutys" label="职务" align="center">
                </el-table-column>
                <el-table-column prop="phone" label="联系方式" align="center">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="obligation" label="队伍职责" align="center"></el-table-column>
            <el-table-column prop="facility" label="抢险设备" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="teamSite" label="队伍分布设置" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="all-block-pager">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="45%" :close-on-click-modal="false" class="dialogForm">
            <rescueTeamForm v-if="status == 'add'" @closeDialog="closeDialog"></rescueTeamForm>
            <rescueTeamForm v-else :rowData="rowData" @closeDialog="closeDialog"></rescueTeamForm>
        </el-dialog>
    </div>
</template>

<script>
import { rescueTeamList, rescueTeamDel } from '@/api/engineering/security/controlManagement'

import rescueTeamForm from "./rescueTeamForm"
export default {
    components: {
        rescueTeamForm
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                affiliation: "",
            },
            tableData: [],//数据
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            rowData: []
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            rescueTeamList(this.queryInfo).then(res => {
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
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        search () {
            this.queryInfo.pageNum = 1
            this.getTableDataList()
        },
        del () { // 题库列表删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {
                        rescueTeamDel(this.rowData[0].mteId).then(res => {
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
</style>
