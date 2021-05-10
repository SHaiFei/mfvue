<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>物资仓储</el-breadcrumb-item>
            <el-breadcrumb-item>物资出库管理</el-breadcrumb-item>
            <el-breadcrumb-item>出库单信息</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">所属单位</span>
                    <treeselect ref="headerChild" class="elinput200" />
                    <span class="font-12 spanText">出库类型</span>
                    <el-input v-model="queryInfo.ckType" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">出库时间</span>
                    <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
                    </el-date-picker><br>
                    <span class="font-12 spanText">出库单号</span>
                    <el-input v-model="queryInfo.ckbillid" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
            </el-row>
            <el-table stripe :data="tableData" style="width: 100%" @selection-change="tableDataSelect" @row-click="clickRow" ref="multipleTable">
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column prop="bumen" label="所属单位" align="center"></el-table-column>
                <el-table-column prop="CKBILLCODE" label="出库单号" align="center"></el-table-column>
                <el-table-column prop="danwei" label="申请单位" align="center"></el-table-column>
                <el-table-column prop="bumen" label="申请部门" align="center"></el-table-column>
                <el-table-column prop="ADMIN" label="操作人" align="center"></el-table-column>
                <el-table-column prop="CKDATE" label="出库时间" align="center"></el-table-column>
                <el-table-column prop="ckType" label="出库类型" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import { tableDataList, addApply,  } from "@/api/supplies/outbound/outboundInfo";
import treeselect from "@/components/treeselect";
export default {
    components: {
        treeselect
    },
    data () {
        return {
            tableData: [],
            total: 0, //分页总数
            dialogFormVisible: false,
            form: {
                navigation: "法律法规",
                lawTypeChinese: "国家",
                publicYear: "",
                lawName: ""
            },
            queryInfo: {
                pageNum: 1,
                pageSize: 10,
                ckbillid:"",
                deptId:"",
                ckType:"",
                beginTime:"",
                endTime:"",
            },
            rowData: [],
            time: ""
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
            this.queryInfo.pageNum = 1
            this.queryInfo.deptId = this.$refs.headerChild.department
            console.log(this.time);
            if(this.time==null){
                this.queryInfo.beginTime = ""
                this.queryInfo.endTime = ""
            }else{
                this.queryInfo.beginTime = this.time[0]
                this.queryInfo.endTime = this.time[1]
            }
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
.el-date-editor--daterange {
    width: 380px;
}
</style>
