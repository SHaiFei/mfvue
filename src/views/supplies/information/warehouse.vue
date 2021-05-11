<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>物资仓储</el-breadcrumb-item>
            <el-breadcrumb-item>基本信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>仓库基本信息管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">所属单位</span>
                    <treeselect ref="headerChild" />
                    <span class="font-12 spanText">仓库名称</span>
                    <el-input v-model="queryInfo.name" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">仓库状态</span>
                    <el-select class="elinput200" clearable v-model="queryInfo.state">
                        <el-option v-for="item in statusList" :key="item.id" :value="item.id" :label="item.label"></el-option>
                    </el-select>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
            </el-row>
            <el-table ref="multipleTable" stripe :data="tableData" style="width: 100%" @row-click="clickRow" @selection-change="tableDataSelect">
                <el-table-column type="selection" align="center" width="50"></el-table-column>
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column show-overflow-tooltip prop="deptname" label="所属单位" align="center"></el-table-column>
                <el-table-column show-overflow-tooltip prop="name" label="物资库名称" align="center"></el-table-column>
                <el-table-column prop="state" label="仓库状态" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.state == 1">在用</div>
                        <div v-if="scope.row.state == 0">维修 </div>
                    </template>
                </el-table-column>
                <el-table-column prop="buildingArea" label="建筑面积" align="center"></el-table-column>
                <el-table-column prop="fzrId" label="库管负责人" align="center"></el-table-column>
                <el-table-column show-overflow-tooltip prop="telphone" label="电话" align="center"></el-table-column>
                <el-table-column show-overflow-tooltip prop="address" label="地址" align="center"></el-table-column>
                <el-table-column prop="leaderId" label="领导" align="center"></el-table-column>
                <el-table-column prop="" label="物资库信息" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.buildingArea != null" class="warehouseInfo" @click="warehouseInfo(scope.row)">
                            物资信息
                        </div>
                        <div v-else>
                            物资信息
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 弹框 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="50%" :close-on-click-modal="false">
            <warehouseForm :rowData="rowData"  @closeDialogFormVisible="closeDialog"></warehouseForm>
        </el-dialog>
    </div>
</template>

<script>
import { tableDataList } from '@/api/supplies/warehouse'

// form 组件
import warehouseForm from "./warehouse/warehouseForm"
import treeselect from "@/components/treeselect"

export default {
    components: { treeselect, warehouseForm },
    data () {
        return {
            tableData: [],
            total: 0, //分页总数
            dialogFormVisible: false,
            form: {
            },
            queryInfo: {
                pageNum: 1,
                pageSize: 10,
                userName: "",
                name: "",
                state: "",
                deptid: ""
            },
            statusList: [
                { label: "维修", id: 0 },
                { label: "在用", id: 1 }
            ],
            rowData: []
        };
    },
    created () {
        this.getTableDataList()
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
        add () {
            this.title = "添加"
            this.dialogFormVisible = true
        },
        edit () {
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            }
            this.title = "修改"
            this.dialogFormVisible = true
        },
        clickRow (row, column, event) { //点击行
            // let index = this.rowData.findIndex(item => {
            //     return item.id == row.id
            // });
            // if (index == -1) {
            //     this.$refs.multipleTable.toggleRowSelection(row, true);
            // } else {
            //     // 如果已存在，设置未选状态，并在list中删除这条数据 
            //     this.$refs.multipleTable.toggleRowSelection(row, false)
            // }
        },
        warehouseInfo (rowData) {
            this.$router.push({ path: '/supplies/warehouseInfo', query: { id: rowData.id } })
        },
        closeDialog () { // 关闭弹框
            this.dialogFormVisible = false
        },
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        search () { //查询
            this.queryInfo.deptid = this.$refs.headerChild.department
            this.queryInfo.pageNum = 1
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
.warehouseInfo {
    cursor: pointer;
    text-decoration: underline;
    color: #409eff;
}
</style>
