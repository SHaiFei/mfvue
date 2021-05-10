<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>工程转入</el-breadcrumb-item>
            <el-breadcrumb-item>行政审批转入</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>基本信息</el-breadcrumb-item>
            <el-breadcrumb-item>信息管理</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">工程名称</span>
                    <el-input v-model="queryInfo.projectname" clearable></el-input>
                    <span class="font-12 spanText">工程编号</span>
                    <el-input v-model="queryInfo.projectcode" clearable></el-input>
                    <span class="font-12 spanText">工程地质</span>
                    <el-input v-model="queryInfo.address" clearable></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="add">添加</el-button>
                    <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                </div>
                </el-col>
            </el-row>
            <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;" @selection-change='tableDataSelect'>
                <el-table-column type="selection" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="PROJECTNAME" label="工程名称" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="PROJECTCODE" label="工程编号" align="center"></el-table-column>
                <el-table-column prop="ADDRESS" label="工程地址" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <div @click="engineering(scope.row)" class="preview">查 看</div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
import { tableList } from '@/api/examination/engineering'
export default {
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                address: "",
                projectname: "",
                projectcode: ""
            },
            total: 0,
            tableData: [],
            rowData: [],
        }
    },
    created () {
        this.getTableDataList()
    },
    moutend () { },
    methods: {
        getTableDataList () {
            tableList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        search () { //  查询
            this.getTableDataList()
        },
        add () {
            this.$router.push({ path: "/engineering/detailsadd" })
        },
        edit () {
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.$router.push({ path: '/engineering/detailsEdit', query: { id: this.rowData[0].PROJECTID, type: this.rowData[0].TYPE } })
            }
        },
        tableDataSelect (val) {
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        engineering (row) { // 查看
            this.$router.push({ path: '/engineering/details', query: { id: row.PROJECTID, type: row.TYPE } })
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
.el-select,
.el-input {
    width: 200px;
}
</style>
