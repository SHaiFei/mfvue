<template>
    <div class="all-data-detail">
        <el-row :gutter="24">
            <el-col :span="11" class="elColBorder">
                <el-row class="elRow">
                    <div class="elRowLeft">
                        <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                        <el-button type="primary" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                    </div>
                </el-row>
                <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @row-click="clickRow" @selection-change='tableDataSelect' :row-class-name="tableRowClassName">
                    <el-table-column type="selection" width="50" align="center"></el-table-column>
                    <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                    <el-table-column prop="storeUnit" label="储备单位" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="storeSite" label="储备地点" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="principal" label="负责人" align="center"></el-table-column>
                    <el-table-column prop="phone" label="联系电话" align="center" show-overflow-tooltip></el-table-column>
                </el-table>
            </el-col>
            <el-col :span="13" class="elColBorder">
                <el-row class="elRow">
                    <div class="elRowLeft">
                        <span class="font-12 spanText">单位名称</span>
                        <el-input v-model="queryInfo.projectname" clearable class="elinput200"></el-input>
                        <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                    </div>
                </el-row>
                <el-table :data="tableData2" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
                    <!-- <el-table-column type="selection" width="50" align="center"></el-table-column> -->
                    <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                    <el-table-column prop="name" label="物资名称" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="unit" label="单位" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="storeSite" label="存放地点" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div v-show="scope.row.or == 'true'">{{ scope.row.storeSite }}</div>
                            <input v-show="scope.row.or == 'false'" type="text" v-model="scope.row.storeSite" class="input200">
                        </template>
                    </el-table-column>
                    <el-table-column prop="amount" label="储备数量" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div v-show="scope.row.or == 'true'">{{ scope.row.amount }}</div>
                            <input v-show="scope.row.or == 'false'" type="text" v-model="scope.row.amount" class="input200">
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <span class="preview" v-if="scope.row.or == 'true'" @click="changeStoreSite(scope.row)">编辑</span>
                            <span>
                                <span class="preview" @click="saveDetail(scope.row)">保存</span>
                                <span class="preview" style="margin-left: 5px" @click="changeNo(scope.row)">清除</span>
                            </span>
                        </template>

                    </el-table-column>
                </el-table>
                <div class="all-block-pager">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>

        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="35%" :close-on-click-modal="false" class="dialogForm">
            <reservesForm v-if="status == 'add'" @closeDialog="closeDialog"></reservesForm>
            <reservesForm v-else :rowData="rowData" @closeDialog="closeDialog"></reservesForm>
        </el-dialog>
    </div>
</template>

<script>
import { reservesList, reservesDel, reservesDetailList, reservesDetailEdit } from '@/api/engineering/security/controlManagement'

import reservesForm from "./reservesForm"
export default {
    components: {
        reservesForm
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
            },
            tableData: [],//数据
            tableData2: [],//数据
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            rowData: [],
            status: "",
            msuId: ""
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            reservesList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        getReservesDetailList (msuId) {
            reservesDetailList(msuId).then(res => {
                if (res.code == 200) {
                    this.tableData2 = res.rows;
                    this.total = res.total; //总页数
                }
            })
        },
        add () { // 添加
            this.status = "add"
            this.title = "新增"
            this.dialogFormVisible = true
        },
        edit () { //  修改
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.status = "edit"
                this.title = "修改"
                this.dialogFormVisible = true
            }
        },
        search () {
            this.queryInfo.pageNum = 1
            this.getTableDataList()
        },
        clickRow (row, column, event) { //点击行
            this.getReservesDetailList(row.msuId)
            this.msuId = row.msuId
            this.$refs.multipleTable.toggleRowSelection(row)
        },
        changeStoreSite (row) { // 详情列表 编辑按钮
            row.or = 'false'
        },
        changeNo (row) { // 详情列表 清除按钮
            row.or = 'true'
        },
        saveDetail (row) { // 详情列表 保存按钮
            let params = {
                sumId: row.sumId,
                amount: row.amount,
                storeSite: row.storeSite
            }
            reservesDetailEdit(params).then(res => {
                if (res.code == 200) {
                    this.msgSuccess(res.msg)
                    this.getReservesDetailList(this.msuId)
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        tableDataSelect (selection) {
            this.rowData = selection
            if (selection.length > 1) {
                const del_row = selection.shift()
                console.log(del_row);
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        tableRowClassName ({ row, rowIndex }) {
            let color = ""
            this.rowData.forEach((item) => {
                if (item.msuId == row.msuId) {
                    color = "tableSelectedRowBgcolor";
                }
            });
            return color
        },
        del () { // 题库列表删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {
                        reservesDel(this.rowData[0].msuId).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    }
                }).catch(e => e)
            }
        },
        closeDialog () {
            this.dialogFormVisible = false
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
.elColBorder {
    border: 1px solid #95b8e7;
}
.preview {
    margin: 0 5px;
}
::v-deep .input200 {
    width: 120px !important;
}
</style>
