<template>
    <div class="all-data-detail">
        <!-- <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>在线考试</el-breadcrumb-item>
            <el-breadcrumb-item>考试统计</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class="all-titles">考试统计</div>
        <div class="pageStyle">
            <el-row class="elRow">
                <el-col>
                    <span class="font-12 spanText">工程名称</span>
                    <el-input v-model="queryInfo.projectname" clearable></el-input>
                    <span class="font-12 spanText">工程编号</span>
                    <el-input v-model="queryInfo.projectcode" clearable></el-input>
                    <span class="font-12 spanText">工程地质</span>
                    <el-input v-model="queryInfo.address" clearable></el-input>
                    <div class="buttons">
                        <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-table :data="tableData" stripe style="width:100%;margin-top: 10px;" border>
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="PROJECTNAME" label="工程名称" align="center"></el-table-column>
                <el-table-column prop="PROJECTCODE" label="工程编号" align="center"></el-table-column>
                <el-table-column prop="ADDRESS" label="工程地址" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="success" @click="engineering(scope.row)">
                            查看
                        </el-button>
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
        engineering (row) { // 查看
            this.$router.push({ path: '/examination/details', query: { id: row.PROJECTID, type: row.TYPE } })
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
