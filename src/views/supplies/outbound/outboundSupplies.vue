<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>物资仓储</el-breadcrumb-item>
            <el-breadcrumb-item>物资出库管理</el-breadcrumb-item>
            <el-breadcrumb-item>物资出库</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <el-form style="display: inline-block">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="正常"></el-radio>
                            <el-radio label="外借"></el-radio>
                            <el-radio label="维修"></el-radio>
                            <el-radio label="演习"></el-radio>
                            <el-radio label="报废"></el-radio>
                        </el-radio-group>
                    </el-form>
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="search">出库并生成出库单</el-button>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="info">出库历史信息</el-button>
                </div>
            </el-row>
            <el-table stripe :data="tableData" style="width: 100%" @selection-change="tableDataSelect" @row-click="clickRow" ref="multipleTable">
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column prop="" label="物资编码" align="center"></el-table-column>
                <el-table-column prop="" label="物资名称" align="center"></el-table-column>
                <el-table-column prop="" label="存放地址" align="center"></el-table-column>
                <el-table-column prop="" label="类别" align="center"></el-table-column>
                <el-table-column prop="" label="出库类型" align="center"></el-table-column>
                <el-table-column prop="" label="库存数量" align="center"></el-table-column>
                <el-table-column prop="" label="出库数量" align="center"></el-table-column>
                <el-table-column prop="" label="计量单位" align="center"></el-table-column>
                <el-table-column prop="" label="出库时间" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    data () {
        return {
            tableData: [],
            total: 0, //分页总数
            dialogFormVisible: false,
            form: {
                navigation: "法律法规",
                lawTypeChinese: "国家",
                publicYear: "",
                lawName: ""
            },
            queryInfo: {
                pageNum: 1,
                pageSize: 10
            },
            rowData: []
        };
    },
    created () {
        // this.getTableDataList();
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
        info(){
            this.$router.push({path: "/supplies/suppliesInfo"})
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
