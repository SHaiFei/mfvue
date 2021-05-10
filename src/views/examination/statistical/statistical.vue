<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>在线考试</el-breadcrumb-item>
            <el-breadcrumb-item>考试统计</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-table :data="tableData" stripe style="width:100%;margin-top: 10px;">
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="NAME" label="试卷名称" align="center"></el-table-column>
                <el-table-column prop="TIME" label="考试时长" align="center"></el-table-column>
                <el-table-column prop="GRADE" label="满分" align="center"></el-table-column>
                <el-table-column prop="GRADEI" label="及格分" align="center"></el-table-column>
                <el-table-column prop="JGL" label="及格率" align="center"></el-table-column>
                <el-table-column prop="R" label="参考人数" align="center" width="200px"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <div class="preview" @click="selftest(scope.row)">
                            查 看
                        </div>
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
import { statisicalList } from '@/api/examination/selftest'
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
    moutend () { },
    methods: {
        getTableDataList () {
            statisicalList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        searchBtn () {
            this.getTableDataList()
        },
        selftest (row) {
            this.$router.push({ path: '/examination/statistpreview', query: { id: row.ID } })
            // this.$router.push({ name: '考试统计查看', params: { id: row.ID } })
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
