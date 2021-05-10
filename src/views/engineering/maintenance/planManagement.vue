<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>维护维修</el-breadcrumb-item>
            <el-breadcrumb-item>计划管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">年份</span>
                    <el-date-picker v-model="queryInfo.year" clearable class="elinput200" type="year" placeholder="选择日期" value-format="yyyy">
                    </el-date-picker>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-download" @click="download">导出</el-button>
                </div>
            </el-row>
            <el-table :data="tableData" stripe style="width:100%;margin-top: 10px">
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="county" label="所属区" align="center"></el-table-column>
                <el-table-column prop="zAmount" label="防空地下室总处数" align="center"></el-table-column>
                <el-table-column prop="zArea" label="防空地下室总面积(㎡)" align="center"></el-table-column>
                <el-table-column prop="" label="其中" align="center">
                    <el-table-column prop="publicArea" label="公用面积(㎡)" align="center"></el-table-column>
                    <el-table-column prop="unitArea" label="单位面积(㎡)" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="" label="计划维护维修情况" align="center">
                    <el-table-column prop="" label="单位工程" align="center">
                        <el-table-column prop="unitMasun" label="计划维修处数" align="center"></el-table-column>
                        <el-table-column prop="unitMaarea" label="计划治理面积(㎡)" align="center"></el-table-column>
                    </el-table-column>
                    <el-table-column prop="" label="公用工程" align="center">
                        <el-table-column prop="publicMasun" label="计划维修处数" align="center"></el-table-column>
                        <el-table-column prop="publicMaarea" label="计划治理面积(㎡)" align="center"></el-table-column>
                        <el-table-column prop="subsidy" label="市局补贴经费（万元）" align="center"></el-table-column>
                        <el-table-column prop="matching" label="区财政配套经费（万元）" align="center"></el-table-column>
                    </el-table-column>
                    <el-table-column prop="reportState" label="是否上报" align="center"></el-table-column>
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
import { planManagementList, exportList } from '@/api/engineering/maintenance/progress'

export default {
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                year: ""
            },
            tableData: [],//数据
            total: 0,//分页总数
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            planManagementList(this.queryInfo.year).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        search () {
            this.getTableDataList()
        },
        download () {  // 导出
            exportList(this.queryInfo.year).then(res => {
                console.log(res);
                if (res.code == 200) {
                    location.href = this.GLOBAL.download_URL + "/common/download?fileName=" + res.msg
                }
            })
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

    }
};
</script>
<style lang="less" scoped>
.dialogForm .el-select {
    width: 100%;
}
.el-form-item {
    margin-left: 5px;
}
</style>
