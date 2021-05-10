<template>
    <div>
        <el-row class="elRow">
            <div class="elRowLeft">
                <span class="font-12 spanText">所属区</span>
                <areaCom ref="areaCom" class="elinput200"></areaCom>
                <span class="font-12 spanText">工程编号</span>
                <el-input v-model="queryInfo.underCode" clearable class="elinput200"></el-input>
                <span class="font-12 spanText">工程名称</span>
                <el-input v-model="queryInfo.underName" clearable class="elinput200"></el-input>
                <span class="font-12 spanText">使用单位</span>
                <el-input v-model="queryInfo.useTarget" clearable class="elinput200"></el-input>
                <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
            </div>
            <div class="buttons">
                <el-button type="primary" size="small" icon="el-icon-view" @click="eng">查看工程</el-button>
            </div>
        </el-row>
        <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
            <el-table-column type="selection" label="" width="50px" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
            <el-table-column prop="county" label="所属区" align="center"></el-table-column>
            <el-table-column prop="underCode" label="工程编号" align="center"></el-table-column>
            <el-table-column prop="street" label="街道" align="center"></el-table-column>
            <el-table-column prop="underName" label="工程名称" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="useTarget" label="使用用途" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="useUnit" label="使用单位" align="center"></el-table-column>
        </el-table>
        <div class="all-block-pager">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog title="查看" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="50%" :close-on-click-modal="false" class="dialogForm">
            <engineering :rowData="rowData" @closeDialog="closeDialog"></engineering>
        </el-dialog>
    </div>
</template>

<script>
import { tableDataList } from '@/api/engineering/supervision/securityCheck'
import { undergroundList } from '@/api/engineering/security/fireControl'

import areaCom from '@/components/area'
import engineering from '@/components/engineering'
export default {
    components: {
        areaCom, engineering
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                useTarget: "",
                underCode: "",
                underName: ""
            },
            tableData: [],//数据
            total: 0,//分页总数
            rowData: [],
            dialogFormVisible:  false
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            tableDataList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                    this.total = res.total
                }
            });
        },
        search () {
            this.queryInfo.county = this.$refs.areaCom.areaVal
            this.queryInfo.pageNum = 1
            this.getTableDataList()
        },
        eng () {
            if (this.rowData.length != 1){
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            }
            undergroundList(this.rowData[0].underId).then(res => {
            })
            this.dialogFormVisible = true
        },
        tableDataSelect (val) {
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
        }
    }
};
</script>
<style lang="scss" scoped>
</style>
