<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>监控报警</el-breadcrumb-item>
            <el-breadcrumb-item>视频监控</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">所属区</span>
                    <areaCom ref="areaCom" class="elinput200"></areaCom>
                    <span class="font-12 spanText">工程编号</span>
                    <el-input v-model="queryInfo.address" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">工程名称</span>
                    <el-input v-model="queryInfo.address" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-view" @click="eng">查看工程</el-button>
                    <el-button type="primary" size="small" icon="el-icon-download" @click="edit">下载视频控件</el-button>
                </div>
            </el-row>
            <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect' >
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="area" label="所属区" align="center"></el-table-column>
                <el-table-column prop="contractName" label="工程编号" align="center"></el-table-column>
                <el-table-column prop="type" label="街道" align="center"></el-table-column>
                <el-table-column prop="yname" label="工程名称" align="center"></el-table-column>
                <el-table-column prop="date" label="使用用途" align="center"></el-table-column>
                <el-table-column prop="date" label="使用单位" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog title="查看" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="50%" :close-on-click-modal="false" class="dialogForm">
            <engineering :rowData="rowData" @closeDialog="closeDialog"></engineering>
        </el-dialog>
    </div>
</template>

<script>
import { undergroundList } from '@/api/engineering/security/fireControl'

import engineering from '@/components/engineering'
import areaCom from '@/components/area'
export default {
    components: {
        areaCom, engineering
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
            },
            tableData: [],//数据
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            options: [],
            form: {

            },
            activeName: "maintenance1",
            formRules: {
                tips: [{ required: true, message: "请输入试题解析", trigger: "blur", },],
                content: [{ required: true, message: "请输入试题题干", trigger: "blur", },],
                type: [{ required: true, message: "请选择试题类型", trigger: "blur", },],
            },
            rowData: [],
        }
    },
    created () {
    },
    methods: {
        search () {
        },

        getTableDataList () { // 题库维护列表
            questionList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        add () { // 添加
            this.dialogFormVisible = true
        },
        edit () { //  修改
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            }
            this.dialogFormVisible = true
        },
        clickRow (row, column, event) { //点击行
            let index = this.rowData.findIndex(item => {
                return item.id == row.id
            });
            if (index == -1) {
                this.$refs.multipleTable.toggleRowSelection(row, true);
            } else {
                // 如果已存在，设置未选状态，并在list中删除这条数据 
                this.$refs.multipleTable.toggleRowSelection(row, false)
            }
        },
        eng () {
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            }
            undergroundList(this.rowData[0].underId).then(res => {
            })
            this.dialogFormVisible = true
        },
        closeDialog () {
            this.dialogFormVisible = false
        },
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        tableRowClassName ({ row, rowIndex }) {
            let color = ""
            this.rowData.forEach((item) => {
                if (item.id == row.id) {
                    color = "tableSelectedRowBgcolor";
                }
            });
            return color
        },

        saveAndEidt () {  // 添加时候的确定按钮
            this.$refs.form.validate(valid => {
                if (valid) {

                }
            })
        },

        del () { // 题库列表删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {

                    }
                }).catch(e => e)
            }
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
