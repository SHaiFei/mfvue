<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>在线考试</el-breadcrumb-item>
            <el-breadcrumb-item>考试统计</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">姓名</span>
                    <el-input v-model="queryInfo.name" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">电话</span>
                    <el-input v-model="queryInfo.phonenumber" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">是否考试</span>
                    <el-select v-model="queryInfo.ks" placeholder="请选择" clearable class="elinput200">
                        <el-option v-for='(item,index) in testArr' :key='item.ID' :label="item.label" :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="font-12 spanText">部门</span>
                    <treeselect ref="headerChild" />
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-download" @click="download">导出</el-button>
                </div>
            </el-row>
            <el-table :data="tableData" stripe style="width:100%;">
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="NAME" label="试卷名称" align="center"></el-table-column>
                <el-table-column prop="GRADE" label="满分" align="center"></el-table-column>
                <el-table-column prop="GRADEI" label="及格分" align="center"></el-table-column>
                <el-table-column prop="DEFEN" label="得分" align="center"></el-table-column>
                <el-table-column prop="JG" label="及格" align="center"></el-table-column>
                <el-table-column prop="NICK_NAME" label="姓名" align="center"></el-table-column>
                <el-table-column prop="KS" label="是否考试" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.KS == 'Y'" style="color: green">
                            已考试
                        </div>
                        <div v-if="scope.row.KS == 'N'" style="color: red">
                            未考试
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="EMAIL" label="邮箱" align="center"></el-table-column>
                <el-table-column prop="PHONENUMBER" label="电话" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
import { stPreviewlList, download } from '@/api/examination/selftest'
import treeselect from "@/components/treeselect";

export default {
    components: { treeselect },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                phonenumber: "", // 电话
                name: "", // 姓名
                ks: "", // 是否考试
                deptid: ""  // 部门id
            },
            total: 0,
            tableData: [],
            testArr: [
                { label: "已考试", id: "Y" },
                { label: "未考试", id: "N" }
            ],
        }
    },
    created () {
        this.getTableDataList()
    },
    moutend () { },
    methods: {
        getTableDataList () {
            this.queryInfo.id = this.$route.query.id
            stPreviewlList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        search () { // 查询
            this.queryInfo.deptid = this.$refs.headerChild.department
            this.getTableDataList()
        },
        handleCurrentChange (newPage) {  //分页当前页
            this.queryInfo.pageNum = newPage
            this.getTableDataList()
        },
        handleSizeChange (newSize) {   //分页每页显示条数
            this.queryInfo.pageSize = newSize
            this.getTableDataList()
        },
        download () { // 导出
            window.location.href = this.GLOBAL.download_URL + "exam/exampaper/listctd?id=" + this.$route.query.id
        }
    },
}
</script>


<style lang='scss' scoped>
.el-select,
.el-input {
    width: 200px;
}
.elRow {
    line-height: 12px;
}
.el-table {
    margin-top: 10px !important;
    border-top: 1px solid #dddddd;
}
</style>
