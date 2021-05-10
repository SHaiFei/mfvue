<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>物资仓储</el-breadcrumb-item>
            <el-breadcrumb-item>物资出库管理</el-breadcrumb-item>
            <el-breadcrumb-item>出库申请</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">申请单号</span>
                    <el-input v-model="queryInfo.billid" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">申请时间</span>
                    <el-date-picker
                                v-model="queryInfo.selectDate"
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                placeholder="申请日期"
                                class="elinput2001">
                            </el-date-picker>
                    <!-- <el-input v-model="queryInfo.selectDate" clearable class="elinput200"></el-input> -->
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="success" size="small" @click="outbound">出库申请</el-button>
                </div>
            </el-row>
            <el-table stripe :data="tableData" style="width: 100%" @selection-change="tableDataSelect" @row-click="clickRow" ref="multipleTable">
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column prop="billid" label="申请单号" align="center"></el-table-column>
                <el-table-column prop="bumen" label="申请部门" align="center"></el-table-column>
                <el-table-column prop="danwei" label="申请单位" align="center"></el-table-column>
                <el-table-column prop="wzDetails" label="申请物资明细" align="center"></el-table-column>
                <el-table-column prop="applyDate" label="申请时间" align="center"></el-table-column>
                <el-table-column prop="remark" label="备注" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog title="物资出库(调拨)申请单" :visible.sync="dialogFormVisible" width="45%" v-if="dialogFormVisible" :close-on-click-modal="false" class="dialogForm">
            <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="申请单位(部门)" prop="applyUnitId">
                            <treeselect ref="headerChild" style="width: 100%;margin-top: -40px" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="承办人" prop="handleId">
                            <el-input v-model="form.handleId"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="申请日期" prop="applyDate">
                            <el-date-picker
                                v-model="form.applyDate"
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                placeholder="申请日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="用物资理由" prop="useReasons">
                            <el-input v-model="form.useReasons" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="物资明细" prop="wzDetails">
                            <el-input v-model="form.wzDetails" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="主管处长意见" prop="leadSuggestion">
                            <el-input v-model="form.leadSuggestion" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="form.remark" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="">打 印</el-button>
                <el-button type="primary" @click="saveAndEidt">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableDataList, addApply,  } from "@/api/supplies/outbound/outbound";
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
                applyUnitId:"",
                handleId:"",
                applyDate:"",
                useReasons:"",
                wzDetails:"",
                leadSuggestion:"",
                remark:"",
            },
            formRules: {},
            queryInfo: {
                pageNum: 1,
                pageSize: 10,
                billid: "",
                selectDate: "",
            },
            rowData: []
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
        outbound () {
            this.dialogFormVisible = true
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
            this.getTableDataList()
        },
        saveAndEidt(){
            this.form.applyUnitId = this.$refs.headerChild.department
            addApply(this.form).then(res => {
                if(res.code == 200){
                    this.msgSuccess(res.msg)
                    this.dialogFormVisible = false
                }else{
                    this.msgError(res.msg)
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
</style>
