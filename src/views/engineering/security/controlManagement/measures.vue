<template>
    <!-- 重点防汛部位及抢救措施 -->
    <div class="all-data-detail">
        <el-row class="elRow">
            <div class="elRowLeft">
                <span class="font-12 spanText">地点</span>
                <el-input v-model="queryInfo.site" clearable class="elinput200"></el-input>
                <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
            </div>
            <div class="buttons">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                <!-- <el-button type="primary" size="small" icon="el-icon-view" @click="edit">查看</el-button> -->
            </div>
        </el-row>
        <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
            <el-table-column prop="site" label="地点" align="center"></el-table-column>
            <el-table-column prop="dangerType" label="险情类别" align="center"></el-table-column>
            <el-table-column prop="dutyUnit" label="责任单位" align="center"></el-table-column>
            <el-table-column prop="responsible" label="责任人" align="center"></el-table-column>
            <el-table-column prop="phone" label="办公电话或手机" align="center"></el-table-column>
        </el-table>
        <div class="all-block-pager">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="45%" :close-on-click-modal="false" class="dialogForm">
            <measuresForm v-if="status == 'add'" @closeDialog="closeDialog"></measuresForm>
            <measuresForm v-else :rowData="rowData" @closeDialog="closeDialog"></measuresForm>
        </el-dialog>
    </div>
</template>

<script>

import { measuresList, measuresDel } from '@/api/engineering/security/controlManagement'

import measuresForm from "./measuresForm"
export default {
    components: {
        measuresForm
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                site: "",
            },
            tableData: [],//数据
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            rowData: [],
            status: ""
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            measuresList(this.queryInfo).then(res => {
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
                        measuresDel(this.rowData[0].fmeId).then(res => {
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
</style>
