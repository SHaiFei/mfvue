<template>
    <!-- 货架管理 -->
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>物资仓储</el-breadcrumb-item>
            <el-breadcrumb-item>系统维护</el-breadcrumb-item>
            <el-breadcrumb-item>货架管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">所属单位</span>
                    <treeselect ref="headerChild" />
                    <span class="font-12 spanText">所属仓库</span>
                    <el-select v-model="queryInfo.storeId" clearable class="elinput200">
                        <el-option v-for="item in warehouseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <span class="font-12 spanText">货架名称</span>
                    <el-input v-model="queryInfo.name" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="add">新增</el-button>
                    <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                </div>
            </el-row>
            <el-table stripe :data="tableData" style="width: 100%" @selection-change="tableDataSelect" ref="multipleTable">
                <el-table-column type="selection" align="center" width="50"></el-table-column>
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <!-- <el-table-column prop="orgName" label="所属单位" align="center"></el-table-column> -->
                <el-table-column prop="storename" label="所属仓库" align="center"></el-table-column>
                <el-table-column prop="name" label="货架名称" align="center"></el-table-column>
                <el-table-column prop="isEmpty" label="是否为空" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.isEmpty == '1'">非空</div>
                        <div v-else>空</div>
                    </template>
                </el-table-column>
                <el-table-column prop="createDate" label="创建时间" align="center"></el-table-column>
                <!-- <el-table-column prop="" label="标签状态" align="center"></el-table-column> -->
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%" :close-on-click-modal="false">
            <shelves v-if="status == 'add'"></shelves>
            <shelves v-else :rowData="rowData"></shelves>
        </el-dialog>
    </div>
</template>

<script>
import { tableDataList, warehouseList, shelvesDel } from "@/api/supplies/system/shelves"

import treeselect from "@/components/treeselect";
import shelves from "./shelves/shelvesForm"
export default {
    components: {
        shelves, treeselect
    },
    data () {
        return {
            tableData: [],
            total: 0, //分页总数
            dialogFormVisible: false,
            title: "",
            queryInfo: {
                pageNum: 1,
                pageSize: 10,
                deptid: "",
                storename: "",
                naem: "",
            },
            rowData: [],
            status: "",
            warehouseList: [], // 所属仓库
            info: {
                pageSize: 999999,
                pageNum: 1
            }
        };
    },
    created () {
        this.getTableDataList()
        this.getWarehouseList()
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
        getWarehouseList () {
            warehouseList(this.info).then(res => {
                if (res.code == 200) {
                    this.warehouseList = res.rows
                }
            })
        },
        add () {
            this.status = "add"
            this.title = "新增"
            this.dialogFormVisible = true
        },
        edit () {
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.status = "edit"
                this.title = "修改"
                this.dialogFormVisible = true
            }
        },
        del () { // 删除
            if (this.rowData.length == 0) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                let params = []
                this.rowData.forEach(item => {
                    params.push(item.id)
                })
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {
                        shelvesDel(params).then(res => {
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
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        search () { //查询
            this.queryInfo.orgId = this.$refs.headerChild.department
            this.queryInfo.pageNum = 1;
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
</style>
