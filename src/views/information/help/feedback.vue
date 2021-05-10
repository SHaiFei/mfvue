<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>基本信息</el-breadcrumb-item>
            <el-breadcrumb-item>帮助中心</el-breadcrumb-item>
            <el-breadcrumb-item>意见反馈</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">单位</span>
                    <el-input v-model="queryInfo.address" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">部门</span>
                    <el-input v-model="queryInfo.address" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">姓名</span>
                    <el-input v-model="queryInfo.username" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                </div>
            </el-row>
            <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="n" label="内容" align="center"></el-table-column>
                <el-table-column prop="createTime" label="添加时间" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-c hange="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog title="添加" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="35%" :close-on-click-modal="false" class="dialogForm">
            <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
                <el-form-item label="反馈内容" prop="nr">
                    <el-input v-model="form.nr" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableList, addFeedBack, delFeedBack } from '@/api/information/feedback'
export default {
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                username: "",
                deptid: ""
            },
            tableData: [],//数据
            total: 0,//分页总数
            dialogFormVisible: false,//增加弹窗
            form: {
                nr: ""
            },
            formRules: {},
            rowData: [],
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            tableList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        search () { // 查询
            this.getTableDataList()
        },
        add () { // 添加
            this.dialogFormVisible = true
        },
        save () {  // 添加时候的确定按钮
            this.$refs.form.validate(valid => {
                if (valid) {
                    addFeedBack(this.form).then(res => {
                        if (res.code == 200) {
                            this.dialogFormVisible = false
                            this.getTableDataList()
                        } else {
                            this.msgError(res.msg)
                        }
                    })
                }
            })
        },

        del () { // 删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {
                        delFeedBack({ id: this.rowData[0].id }).then(res => {
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
        //点击分页
        handleCurrentChange (newPage) {  //分页当前页
            this.queryInfo.pageNum = newPage
            this.getTableDataList()
        },
        handleSizeChange (newSize) {   //分页每页显示条数
            this.queryInfo.pageSize = newSize
            this.getTableDataList()
        },
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
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
