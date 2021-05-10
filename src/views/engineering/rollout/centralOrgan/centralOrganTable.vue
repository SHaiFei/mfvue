<template>
    <div class="all-data-detail" style="margin-top: 30px">
        <div class="pageStyle">
            <el-table stripe :data="tableData" style="width: 100%;">
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column prop="underCode" label="工程编号" align="center"></el-table-column>
                <el-table-column prop="underName" label="工程名称" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="YN" label="建设时间" align="center"></el-table-column>
                <el-table-column prop="YN" label="竣工时间" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { centralOrganDetailsList } from "@/api/engineering/security/centralOrgan"

export default {
    watch: {
        "centralOrgan.documentAcceId": function (newVal) {
            this.getTableDataList(newVal)
        }
    },
    props: ["centralOrgan"],
    data () {
        return {
            queryInfo: {
                pageSize: 5,
                pageNum: 1,
            },
            tableData: [],//表格数据
            total: 0,//分页总数
            centralData: this.centralOrgan
        }
    },
    created () {
    },
    mounted () {
        this.$nextTick(() => {
            this.getTableDataList(this.centralData.documentAcceId)
        });
    },
    methods: {
        getTableDataList (documentAcceId) { // 列表
            centralOrganDetailsList(documentAcceId).then(res => {
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
};
</script>
<style lang="less" scoped>
</style>
