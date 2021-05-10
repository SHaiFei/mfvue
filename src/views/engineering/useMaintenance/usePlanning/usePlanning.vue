<template>
    <div class="all-data-detail">
        <el-row class="elRow">
            <div class="elRowLeft">
                <span class="font-12 spanText">工程名称</span>
                <el-input v-model="queryInfo.underName" clearable class="elinput200"></el-input>
                <span class="font-12 spanText">所属区</span>
                <areaCom ref="areaCom" class="elinput200"></areaCom>
                <span class="font-12 spanText">战时功能</span>
                <el-input v-model="queryInfo.address" clearable class="elinput200"></el-input>
                <span class="font-12 spanText">是否规划</span>
                <el-input v-model="queryInfo.address" clearable class="elinput200"></el-input>
                <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
            </div>
            <div class="buttons">
                <!-- <el-button type="primary" size="small" @click="planning">规划</el-button> -->
                <el-button type="primary" size="small" icon="el-icon-view" @click="eng">查看工程</el-button>
            </div>
        </el-row>
        <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
            <el-table-column prop="county" label="所属区" align="center"></el-table-column>
            <el-table-column prop="underCode" label="工程编号" align="center"></el-table-column>
            <el-table-column prop="underName" label="工程名称" align="center"></el-table-column>
            <el-table-column prop="warUse" label="战时功能" align="center"></el-table-column>
            <el-table-column prop="yname" label="是否已规划" align="center"></el-table-column>
        </el-table>
        <div class="all-block-pager">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="60%" :close-on-click-modal="false" class="dialogForm">
            <usePlanningForm v-if="status == 'planning'" :rowData="rowData" @closeDialog="closeDialog"></usePlanningForm>
            <engineering v-if="status =='eng'" :rowData="rowData" @closeDialog="closeDialog"></engineering>
        </el-dialog>
    </div>
</template>

<script>
import { usePlanningList } from '@/api/engineering/security/usePlanning'
import { undergroundList } from '@/api/engineering/security/fireControl'

import usePlanningForm from "./usePlanningForm"
import areaCom from '@/components/area'
import engineering from '@/components/engineering'
export default {
    components: {
        usePlanningForm, areaCom, engineering
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
            },
            dialogFormVisible: false,
            title: "",
            tableData: [],//数据
            total: 0,//分页总数
            rowData: [],
            status: ""
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            usePlanningList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        search () {
            this.queryInfo.county = this.$refs.areaCom.areaVal
            this.queryInfo.pageNum = 1
            this.getTableDataList()
        },
        planning () {
            this.title = '可禁用项设置'
            this.planning = 'planning'
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            }
            this.dialogFormVisible = true
        },
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        eng () {
            this.title = '查看工程'
            this.status = 'eng'
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            }
            undergroundList(this.rowData[0].underId).then(res => {
            })
            this.dialogFormVisible = true
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
<style lang="scss" scoped>
</style>
