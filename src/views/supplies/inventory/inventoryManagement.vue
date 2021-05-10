<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>物资仓储</el-breadcrumb-item>
            <el-breadcrumb-item>盘点及阈值管理</el-breadcrumb-item>
            <el-breadcrumb-item>物资盘点管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <el-button type="primary" size="small" @click="pandian()">盘点</el-button>
                    <!-- <el-button type="primary" size="small" @click="search">盘点提醒设置</el-button> -->
                </div>
                <div class="buttons">
                </div>
            </el-row>
            <!--  -->
            <el-table stripe :data="tableData" style="width: 100%" ref="multipleTable">
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column prop="inventoryName" label="盘点名称" align="center"></el-table-column>
                <el-table-column prop="storingdate" label="盘点时间" align="center"></el-table-column>
                <el-table-column prop="pdId" label="盘点人" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog title="盘点物资详情" :visible.sync="dialogFormVisible" width="80%" v-if="dialogFormVisible" :close-on-click-modal="false" class="dialogForm">
            <div class="elDialogHeight">
                <span class="font-12 spanText">所属单位</span>
                <treeselect ref="headerChild" />
                <span class="font-12 spanText">所属仓库</span>
                <el-select class="elinput200" clearable v-model="pandianInfo.storeid">
                    <el-option v-for="item in warehouseList" :key="item.id" :value="item.id" :label="item.name">
                    </el-option>
                </el-select>
                <el-button type="primary" size="small" icon="el-icon-search" style="margin-left: 10px" @click="search">查询</el-button>
                <el-table stripe :data="pandianData" style="width: 100%;" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                    <el-table-column prop="name" label="物资名称" align="center"></el-table-column>
                    <el-table-column prop="model" label="型号" align="center"></el-table-column>
                    <el-table-column prop="jldw" label="单位" align="center"></el-table-column>
                    <el-table-column prop="storename" label="所属物资库" align="center"></el-table-column>
                    <el-table-column prop="quantity" label="库存数量" align="center"></el-table-column>
                    <el-table-column prop="sjkc" label="实际库存数" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.sjkc" placeholder="实际库存数"></el-input>
                        </template>
                    </el-table-column>、
                    <el-table-column prop="cyyy" label="差异原因" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.cyyy" placeholder="差异原因"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="all-block-pager">
                    <el-pagination background @size-change="pandianSizeChange" @current-change="pandianCurrentChange" :current-page="pandianInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="pandiantotal">
                    </el-pagination>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveAndEidt">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableDataList, pandianList, pandianAdd } from "@/api/supplies/inventory/inventoryManagement"
import { warehouseList } from "@/api/supplies/system/shelves"

import treeselect from "@/components/treeselect";
export default {
    components: {
        treeselect
    },
    data () {
        return {
            pandianInfo: {
                pageNum: 1,
                pageSize: 10,
                storeid: "",
            },
            pandianData: [],
            pandiantotal: 0,
            tableData: [],
            total: 0, //分页总数
            dialogFormVisible: false,
            title: "",
            form: {
                navigation: "",
                lawTypeChinese: "",
                publicYear: "",
                lawName: ""
            },
            queryInfo: {
                pageNum: 1,
                pageSize: 10,
            },
            rowData: [],
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
        pandian () { // 获取盘点列表详情数据
            pandianList(this.pandianInfo).then(res => {
                this.dialogFormVisible = true
                if (res.code == 200) {
                    this.pandianData = res.rows
                    this.pandiantotal = res.total
                }
            })
        },
        search () {
            this.pandianInfo.deptid = this.$refs.headerChild.department
            this.pandian()
        },
        getWarehouseList () { // 获取所属仓库列表
            warehouseList(this.info).then(res => {
                if (res.code == 200) {
                    this.warehouseList = res.rows
                }
            })
        },
        saveAndEidt () {  // 保存按钮
            pandianAdd(this.multipleSelection).then(res => {
                if (res.code == 200) {
                    this.dialogFormVisible = false
                }
            })
        },
        handleSelectionChange (val) {
            this.multipleSelection = val;
        },
        getTableDataList () { // 获取列表数据
            tableDataList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                    this.total = res.total
                }
            })
        },
        //点击分页  列表分页
        handleCurrentChange (newPage) {  //分页当前页
            this.queryInfo.pageNum = newPage
            this.getTableDataList()
        },
        handleSizeChange (newSize) {   //分页每页显示条数
            this.queryInfo.pageSize = newSize
            this.getTableDataList()
        },
        //点击分页 弹框分页
        pandianCurrentChange (newPage) {  //分页当前页
            this.pandianInfo.pageNum = newPage
            this.pandian()
        },
        pandianSizeChange (newSize) {   //分页每页显示条数
            this.pandianInfo.pageSize = newSize
            this.pandian()
        },
    },
}
</script>
<style lang="less" scoped>
.el-dialog-div {
    height: 60vh;
    overflow: auto;
}
.el-table {
    margin-top: 10px !important;
}
.elDialogHeight {
    height: 600px;
    overflow: hidden;
    overflow-y: auto;
}
</style>
