<template>
    <div>
        <el-table :data="tableData" stripe style="width:100%;margin-top: 10px">
            <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
            <el-table-column prop="underCode" label="工程编号" align="center"></el-table-column>
            <el-table-column prop="underName" label="工程名称" align="center"></el-table-column>
            <el-table-column prop="underNum" label="建设时间" align="center"></el-table-column>
            <el-table-column prop="ydate" label="竣工时间" align="center"></el-table-column>
        </el-table>
        <div class="all-block-pager">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>


<script>

import { centralViewList } from '@/api/engineering/engineering/central'

export default {
    watch: {
        "documentAcceId" : function(newVal, oldVal){
            this.getTableDataList(newVal)
        }
    },
    props: ["documentAcceId"],
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 5,
                pageNum: 1,
            },
            tableData: [],//数据
            total: 0,//分页总数
        }
    },
    created () {
        this.getTableDataList(this.documentAcceId)
    },
    methods: {
        getTableDataList (documentAcceId) { // 题库维护列表
            centralViewList(documentAcceId).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
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


<style lang='scss' scoped>
</style>
