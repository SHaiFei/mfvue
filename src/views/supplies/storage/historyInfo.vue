<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>物资仓储</el-breadcrumb-item>
            <el-breadcrumb-item>物资入库管理</el-breadcrumb-item>
            <el-breadcrumb-item>物资入库</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">物资名称</span>
                    <el-input v-model="queryInfo.wzName" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">物资编码</span>
                    <el-input v-model="queryInfo.infocode" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-arrow-left" @click="back">返回扫描页面</el-button>
                </div>
            </el-row>
            <el-table stripe :data="tableData" style="width: 100%" @selection-change="tableDataSelect" @row-click="clickRow" ref="multipleTable">
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column prop="INFOCODE" label="物资编码" align="center"></el-table-column>
                <el-table-column prop="NAME" label="物资名称" align="center"></el-table-column>
                <el-table-column prop="MODEL" label="物资型号" align="center"></el-table-column>
                <el-table-column prop="TYPE" label="物资类别" align="center"></el-table-column>
                <el-table-column prop="QUANTITY" label="数量" align="center"></el-table-column>
                <el-table-column prop="STORINGTYPE" label="入库类型" align="center">
                    <template slot-scope="scoped">
                        <div v-if="scoped.row.STORINGTYPE != ''">
                            {{ scoped.row.STORINGTYPE }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="STORINGDATE" label="扫描入库时间" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import { tableDataList } from "@/api/supplies/historyInfo"
export default {
    data () {
        return {
            tableData: [],
            total: 0, //分页总数
            dialogFormVisible: false,
            form: {
                navigation: "",
                lawTypeChinese: "",
                publicYear: "",
                lawName: ""
            },
            queryInfo: {
                pageNum: 1,
                pageSize: 10,
                infocode: "",
                wzName: ""
            },
            rowData: []
        };
    },
    created () {
        this.getTableDataList();
    },
    methods: {
        getTableDataList () { // 获取列表数据
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
            this.queryInfo.pageNum = 1;
            this.getTableDataList()
        },
        back () {
            this.$router.go(-1)
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
