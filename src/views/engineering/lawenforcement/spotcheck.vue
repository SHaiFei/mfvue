<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>行政执法</el-breadcrumb-item>
            <el-breadcrumb-item>双随机检查</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <!-- <span class="font-12 spanText">任务类型</span>
                    <el-select clearable class="elinput200" v-model="queryInfo">
                        <el-option v-for='(item,index) in tableData' :key='item.id' :label="item.label" :value="item.id">
                        </el-option>
                    </el-select> -->
                    <span class="font-12 spanText">任务状态</span>
                    <el-select clearable class="elinput200" v-model="queryInfo.rwzt">
                        <el-option v-for='(item,index) in rwztArr' :key='item.id' :label="item.label" :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="font-12 spanText">被检查单位</span>
                    <el-input v-model="queryInfo.address" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">指派时间</span>
                    <el-date-picker v-model="queryInfo.zpsj" value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker clearable class="elinput200">
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <!-- <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button> -->
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                    <!-- <el-button type="primary" size="small" @click="edit">指派任务</el-button> -->
                    <el-button type="primary" size="small" @click="viewTaskInfo">查看任务详情</el-button>
                    <el-button type="primary" size="small" @click="feedback">反馈检查结果</el-button>
                </div>
            </el-row>
            <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px"  @selection-change='tableDataSelect'>
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="ssjrwlxname" label="任务类型" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="rwly" label="任务来源" align="center"></el-table-column>
                <el-table-column prop="bjcdw" label="所属区" align="center"></el-table-column>
                <el-table-column prop="rwgs" label="工程数量" align="center"></el-table-column>
                <!-- <el-table-column prop="" label="人员数量" align="center"></el-table-column> -->
                <el-table-column prop="zpsj" label="指派时间" align="center"></el-table-column>
                <el-table-column prop="jzsj" label="截止时间" align="center"></el-table-column>
                <el-table-column prop="rwzt" label="任务状态" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.rwzt == '0'">待指派</div>
                        <div v-else-if="scope.row.rwzt == '1'">已指派</div>
                        <div v-else>已完成</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="all-block-pager">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <!-- 弹框 -->
        <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" :width="dialogW" :close-on-click-modal="false">
            <spotTab v-if="status == 'view'" @closeDialog="closeDialog" :ssjrwId="ssjrwId"></spotTab>
            <feedback v-if="status == 'feedback'" @closeDialog="closeDialog" :ssjrwId="ssjrwId"></feedback>
        </el-dialog>
    </div>
</template>

<script>
import spotTab from "./spotcheck/spotcheckTab"
import feedback from "./spotcheck/feedbackResult"


import { tableDataList, spotcheckDel } from '@/api/engineering/spotcheck'
export default {
    components: {
        spotTab, feedback
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                rwzt: ""
            },
            tableData: [],//数据
            total: 0,//分页总数
            dialogVisible: false,
            title: "",
            ssjrwId: "",
            status: "",
            rowData: [],
            rwztArr: [
                { id: '0', label: '待指派' },
                { id: '1', label: '已指派' },
                { id: '2', label: '已完成' }
            ]
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () {
            tableDataList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                    this.total = res.total
                }
            });
        },
        viewTaskInfo () { // 查看任务详情
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            }
            this.ssjrwId = this.rowData[0].ssjrwId
            this.title = '查看任务详情'
            this.status = 'view'
            this.dialogW = "80%"
            this.dialogVisible = true
        },
        feedback(){ // 反馈检查结果
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            }
            this.ssjrwId = this.rowData[0].ssjrwId
            this.title = '反馈检查结果'
            this.status = 'feedback'
            this.dialogW = "50%"
            this.dialogVisible = true
        },
        closeDialog () {
            this.dialogVisible = false
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
                        spotcheckDel(this.rowData[0].ssjrwId).then(res => {
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
::v-deep .el-input--suffix {
    width: 200px !important;
}
</style>
