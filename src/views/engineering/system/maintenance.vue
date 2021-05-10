<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>系统维护</el-breadcrumb-item>
            <el-breadcrumb-item>人防工程维护</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <!-- <span class="font-12 spanText">所属区</span>
                    <el-select clearable class="elinput200" v-model="queryInfo">
                        <el-option v-for='(item,index) in tableData' :key='item.id' :label="item.label" :value="item.id">
                        </el-option>
                    </el-select> -->
                    <span class="font-12 spanText">街道(乡镇)</span>
                    <el-input v-model="queryInfo.street" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">工程编号</span>
                    <el-input v-model="queryInfo.underCode" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">工程名称</span>
                    <el-input v-model="queryInfo.underName" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">工程类别</span>
                    <el-input v-model="queryInfo.underType" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">战时用途</span>
                    <el-input v-model="queryInfo.warUse" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">使用用途</span>
                    <el-input v-model="queryInfo.useTarget" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">平时用途</span>
                    <el-input v-model="queryInfo.peaceUse" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">使用单位</span>
                    <el-input v-model="queryInfo.useUnit" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
            </el-row>
            <el-table :data="tableData" stripe style="width:100%;margin-top: 10px;">
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="county" label="所属区域" align="center"></el-table-column>
                <el-table-column prop="street" label="街道(乡镇)" align="center"></el-table-column>
                <el-table-column prop="underCode" label="工程编号" align="center"></el-table-column>
                <el-table-column prop="underName" label="工程名称" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="underType" label="工程类别" align="center"></el-table-column>
                <el-table-column prop="warUse" label="战时用途" align="center"></el-table-column>
                <el-table-column prop="useTarget" label="使用用途" align="center"></el-table-column>
                <el-table-column prop="peaceUse" label="平时用途" align="center"></el-table-column>
                <el-table-column prop="useUnit" label="使用单位" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
import { maintenanceList } from '@/api/engineering/system/library'

export default {
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
            },
            total: 0,
            tableData: [],
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () {
            maintenanceList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        search () { //  查询
            this.queryInfo.pageNum = 1
            this.getTableDataList()
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
    },
}
</script>


<style lang='less' scoped>
.elRow {
    margin-top: 10px;
}
.el-select,
.el-input {
    width: 200px;
}
</style>
