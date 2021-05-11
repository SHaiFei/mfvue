<template>
    <div class="all-data-detail" style="margin-top: 30px">
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">所属部门</span>
                    <treeselect ref="headerChild" />
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search()">查询</el-button>
                </div>
            </el-row>
        </div>
        <el-table stripe :data="tableData" style="width: 100%;" @selection-change="tableDataSelect" @row-click="clickRow" ref="multipleTable">
            <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
            <el-table-column prop="USER_NAME" label="登录账号" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="NICK_NAME" label="登录名称" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="YN" label="学习状态" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <div class="preview" @click="clickRow(scope.row)">查 看</div>
                </template>
            </el-table-column>
        </el-table>
        <div class="all-block-pager">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <!-- 弹窗 -->
        <el-dialog title="查看" :visible.sync="dialogFormVisible" width="60%" :close-on-click-modal="false" class="dialogForm">
            <el-table stripe :data="dialogTableData" style="width: 100%;" ref="multipleTable">
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column prop="NAME" label="课件名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="YN" label="学习状态" align="center" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { coursewareList, dialogTableDataList } from '@/api/learning/regulations'
import { deptList } from '@/api/examination/selftest'

import treeselect from "@/components/treeselect";

export default {
    components: {
        treeselect
    },
    watch: {
        "coursewareId": function (newVal) {
            console.log(newVal);
            this.queryInfo.subjectid = newVal
            this.getTableDataList()
        }
    },
    props: ["coursewareId"],
    data () {
        return {
            dialogFormVisible: false,
            queryInfo: {
                pageSize: 5,
                pageNum: 1,
                subjectid: "",
                deptid: ""
            },
            tableData: [],//表格数据
            total: 0,//分页总数
            rowData: [],
            classificationList: [], // 分类列表

            dialogTableData: [], // 弹框表格数据
            queryInfoDialog: {
                // pageSize: 10,
                // pageNum: 1,
                name: "",
                subjectid: "",
                createBy: ""
            }
        }
    },
    created () {
        this.getTableDataList() // 列表
    },
    methods: {
        getTableDataList () { // 列表
            this.queryInfo.subjectid = this.coursewareId
            coursewareList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        search () {  // 查询
            this.queryInfo.deptid = this.$refs.headerChild.department

            console.log(this.queryInfo);
            this.queryInfo.pageNum = 1
            this.getTableDataList()
        },
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        getClassification () { // 课目分类 
            classification().then(res => {
                if (res.code == 200) {
                    this.classificationList = res.data
                }
            })
        },
        clickRow (row, column, event) { //点击行
            this.queryInfoDialog.createBy = row.USER_ID
            dialogTableDataList(this.queryInfoDialog).then(res => {
            })
            this.dialogFormVisible = true
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
.dialogForm .el-select {
    width: 100%;
}
.el-form-item {
    margin-left: 5px;
}
.el-select,
.el-input--suffix {
    width: 200px;
}
.elRowLeft {
    margin-left: -20px;
}
.el-dialog-div {
    height: 550px;
    overflow-y: auto;
}
</style>
