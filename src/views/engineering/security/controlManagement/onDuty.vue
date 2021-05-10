<template>
    <!-- 防汛值班人员 -->
    <div class="all-data-detail">
        <el-row class="elRow">
            <div class="elRowLeft">
                <span class="font-12 spanText">防汛角色</span>
                <el-select v-model="queryInfo.fRole" class="elinput200" clearable>
                    <el-option v-for="item in roleArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
                <span class="font-12 spanText">资料名称</span>
                <el-input v-model="queryInfo.address" clearable class="elinput200"></el-input>
                <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
            </div>
            <div class="buttons">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                <!-- <el-button type="primary" size="small" icon="el-icon-view" @click="unitInfo">查看</el-button> -->
            </div>
        </el-row>
        <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
            <el-table-column prop="fRole" label="防汛角色" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.fRole == '1'">指挥</div>
                    <div v-if="scope.row.fRole == '2'">常副指挥</div>
                    <div v-if="scope.row.fRole == '3'">副指挥</div>
                    <div v-if="scope.row.fRole == '4'">成员</div>
                    <div v-if="scope.row.fRole == '5'">办公室主任</div>
                    <div v-if="scope.row.fRole == '6'">副主任</div>
                    <div v-if="scope.row.fRole == '7'">联系人</div>
                </template>
            </el-table-column>
            <el-table-column prop="monicker" label="姓名" align="center"></el-table-column>
            <el-table-column prop="duty" label="职务" align="center"></el-table-column>
            <el-table-column prop="offPhone" label="办公电话" align="center"></el-table-column>
            <el-table-column prop="handset" label="手机电话" align="center"></el-table-column>
        </el-table>
        <div class="all-block-pager">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%" :close-on-click-modal="false" class="dialogForm">
            <onDutyForm v-if="status == 'add'" @closeDialog="closeDialog"></onDutyForm>
            <onDutyForm v-else :rowData="rowData" @closeDialog="closeDialog"></onDutyForm>
        </el-dialog>
    </div>
</template>

<script>
import { tableDataList, unitInfo, onDutyDel } from '@/api/engineering/security/controlManagement'

import onDutyForm from "./onDutyForm"
export default {
    components: {
        onDutyForm
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                fRole: "",
            },
            tableData: [],//数据
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            rowData: [],
            status: "",
            roleArr: [
                { id: 1, label: '指挥' },
                { id: 2, label: '常副指挥' },
                { id: 3, label: '副指挥' },
                { id: 4, label: '成员' },
                { id: 5, label: '办公室主任' },
                { id: 6, label: '副主任' },
                { id: 7, label: '联系人' },
            ],
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
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        del () { // 题库列表删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {
                        onDutyDel(this.rowData[0].fstId).then(res => {
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
        unitInfo () {
            unitInfo(this.rowData[0].fcoId).then(res => {
                console.log(res);
            })
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
</style>
