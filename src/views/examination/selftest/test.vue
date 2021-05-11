<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>在线考试</el-breadcrumb-item>
            <el-breadcrumb-item>待考试</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">试卷名称</span>
                    <el-input v-model="queryInfo.name" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
            </el-row>
            <el-table :data="tableData" stripe style="width:100%;margin-top: 10px;">
                <!-- <el-table-column type="selection" width="50" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="name" label="试卷名称" align="center"></el-table-column>
                <el-table-column prop="subjectname" label="课目名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="time" label="考试时长" align="center"></el-table-column>
                <el-table-column prop="grade" label="试卷总分" align="center"></el-table-column>
                <el-table-column prop="gradei" label="及格分" align="center"></el-table-column>
                <el-table-column prop="c1" label="试题数量" align="center"></el-table-column>
                <el-table-column prop="createTime" label="组卷时间" align="center" width="200px"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="success" @click="selftest(scope.row)">
                            开始自测
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
import { selftestList } from '@/api/examination/selftest'
export default {
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                name: ""  // 查询条件  试卷名称
            },
            total: 0,
            tableData: [],
            name: "",
            strategyArr: [
                { label: '未通过', id: 1 },
                { label: '已通过', id: 2 },
            ],
            form: {
                subjectid: "",
                name: ""
            }

        }
    },
    created () {
        this.getTableDataList()
    },
    moutend () { },
    methods: {
        getTableDataList () {
            selftestList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        search () {
            this.getTableDataList()
        },
        selftest (row) {
            let params = {
                id: row.id,
                state: 'selftest'
            }
            this.$router.push({ path: '/examination/preview', query: { res: JSON.stringify(params) } })
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
// .elRow {
//     margin-top: 10px;
// }
.el-select,
.el-input {
    width: 200px;
}
.dialogForm .el-select {
    width: 100%;
}
.el-form-item {
    margin-left: 5px;
}
</style>
