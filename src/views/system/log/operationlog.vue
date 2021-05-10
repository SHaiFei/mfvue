<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>操作日志</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">用户名称</span>
                    <el-input v-model="queryInfo.userName" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">所属部门</span>
                    <treeselect ref="headerChild" />
                    <span class="font-12 spanText">操作时间</span>
                    <el-date-picker v-model="value" type="daterange" range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-download" @click="upload">导出</el-button>
                </div>
            </el-row>
            <el-table stripe :data="tableData" style="width: 100%" ref="multipleTable">
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column prop="title" label="系统模块" align="center" ></el-table-column>
                <el-table-column prop="requestMethod" label="请求方式" align="center" ></el-table-column>
                <el-table-column prop="deptId" label="操作人员" align="center" ></el-table-column>
                <el-table-column prop="operIp" label="主机" align="center" ></el-table-column>
                <el-table-column prop="operTime" label="操作日期" align="center" ></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { operationlogList } from "@/api/system/operationlog";

import treeselect from "@/components/treeselect"
export default {
    components: {
        treeselect
    },
    data () {
        return {
            tableData: [],
            total: 0, //分页总数
            queryInfo: {
                pageNum: 1,
                pageSize: 10,
                userName: "",
                deptId: null,
                beginTime: "",
                endTime: ""
            },
            value: ""
        };
    },
    created () {
        this.getTableDataList();
    },
    methods: {
        getTableDataList () { // 获取列表数据
            this.queryInfo.beginTime = this.value[0]
            this.queryInfo.endTime = this.value[1]
            operationlogList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                    this.total = res.total
                }
            })
        },
        search () { //查询
            this.queryInfo.deptId = this.$refs.headerChild.department
            this.queryInfo.pageNum = 1;
            this.getTableDataList();
        },
        upload () { // 导出
            let params = {}
            if (this.value != "") {
                params.beginTime = this.value[0]
                params.endTime = this.value[1]
            } else {
                params.beginTime = ""
                params.endTime = ""
            }
            params.deptId = this.queryInfo.deptId
            params.userName = this.queryInfo.userName
            if (params.deptId != null) {
                window.location.href = this.GLOBAL.download_URL + "ps/e?deptId=" + params.deptId + "&beginTime" + params.beginTime + "&endTime" + params.endTime + "&userName" + params.userName
            } else {
                window.location.href = this.GLOBAL.download_URL + "ps/e?userName=" + params.userName + "&beginTime" + params.beginTime + "&endTime" + params.endTime
            }
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
::v-deep .el-range-separator {
    width: 20px !important;
    line-height: 25px !important;
}
</style>
