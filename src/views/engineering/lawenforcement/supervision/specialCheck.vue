<template>
    <div>
        <el-row class="elRow">
            <div class="elRowLeft">
                <span class="font-12 spanText">任务名称</span>
                <el-input v-model="queryInfo.taskName" clearable class="elinput200"></el-input>
                <span class="font-12 spanText">任务时限</span>
                <el-date-picker v-model="queryInfo.deadline" value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker clearable class="elinput200">
                <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
            </div>
            <div class="buttons">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                <!-- <el-button type="primary" size="small" @click="edit">查看</el-button> -->
                <el-button type="primary" size="small" icon="el-icon-download" @click="downloadFile">下载</el-button>
                <el-button type="primary" size="small" icon="el-icon-download" @click="download">导出任务</el-button>
            </div>
        </el-row>
        <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
            <el-table-column prop="taskName" label="任务名称" align="center"></el-table-column>
            <el-table-column prop="deadline" label="任务时限" align="center"></el-table-column>
            <el-table-column prop="taskExplain" label="任务说明" align="center"></el-table-column>
            <el-table-column prop="yname" label="操作" align="center" width="150">
                <template slot-scope="scope">
                    <div class="preview" @click="info(scope.row)">
                        任务说明
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="all-block-pager">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="35%" :close-on-click-modal="false" class="dialogForm">
            <specialCheckForm v-if="status == 'add'" @closeDialog="closeDialog"></specialCheckForm>
            <specialCheckForm v-else :rowData="rowData" @closeDialog="closeDialog"></specialCheckForm>
        </el-dialog>
    </div>
</template>

<script>

import { specialCheckList, specialCheckDel, specialCheckExport } from '@/api/engineering/supervision/securityCheck'

import specialCheckForm from "./specialCheckForm"
export default {
    components: {
        specialCheckForm
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
            status: ""
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            specialCheckList(this.queryInfo).then(res => {
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
                        specialCheckDel(this.rowData[0].sckId).then(res => {
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
        tableDataSelect (val) {
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        info (row) {
            this.$router.push({ path: "/engineering/spotcheckInfo", query: { id: row.sckId } })
        },
        download () { // 导出
            specialCheckExport().then(res => {
                if (res.code == 200) {
                    location.href = this.GLOBAL.download_URL + "/common/download?fileName=" + res.msg
                }
            })
        },
        closeDialog () {
            this.dialogFormVisible = false
        },
        downloadFile () { // 下载附件
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            }
            if (this.rowData[0].fileId == null) {
                return this.msgError("此方案没有附件")
            }
            location.href = this.GLOBAL.download_URL + "/downloadFile?fileId=" + this.rowData[0].fileId
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
<style lang="scss" scoped>
::v-deep .el-input--suffix {
    width: 200px !important;
}
</style>
