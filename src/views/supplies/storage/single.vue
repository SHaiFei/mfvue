<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>物资仓储</el-breadcrumb-item>
            <el-breadcrumb-item>物资入库管理</el-breadcrumb-item>
            <el-breadcrumb-item>物资入库单</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">所属单位</span>
                    <el-input v-model="queryInfo.danwei" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">入库单号</span>
                    <el-input v-model="queryInfo.code" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">入库时间</span>
                    <el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd hh:mm:ss" :default-time="['00:00:00', '23:59:00']">
                    </el-date-picker>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-arrow-left" @click="back">返回扫描页面</el-button>
                </div>
            </el-row>
            <el-table stripe :data="tableData" style="width: 100%" @selection-change="tableDataSelect" @row-click="clickRow" ref="multipleTable">
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column prop="DANWEI" label="所属单位" align="center"></el-table-column>
                <el-table-column prop="BUMEN" label="部门" align="center"></el-table-column>
                <el-table-column prop="BILLCODE" label="入库单号" align="center"></el-table-column>
                <el-table-column prop="POPNAME" label="操作人" align="center"></el-table-column>
                <el-table-column prop="TIME" label="入库时间" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { tableDataList } from "@/api/supplies/single"
export default {
    data () {
        return {
            tableData: [],
            total: 0, //分页总数
            dialogFormVisible: false,
            value: "",
            queryInfo: {
                pageNum: 1,
                pageSize: 10,
                danwei: "",
                code: "",
                beginTime: "",
                endTime: ""
            },
            rowData: []
        };
    },
    created () {
        this.getTableDataList();
    },
    methods: {
        getTableDataList () { // 获取列表数据
            console.log(this.value);
            if (this.value != null || this.value != "") {
                this.queryInfo.beginTime = this.value[0]
                this.queryInfo.endTime = this.value[1]
            }
            tableDataList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                    this.total = res.total
                }
            })
        },
        clickRow (row, column, event) { //点击行
        },
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        search () { //查询
            this.queryInfo.pageNum = 1
            this.getTableDataList()
        },
        back () {
            this.$router.push({ path: "/supplies/storage" })
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
};
</script>
<style lang="less" scoped>
.el-dialog-div {
    height: 60vh;
    overflow: auto;
}
.el-table {
    margin-top: 10px;
}
</style>
