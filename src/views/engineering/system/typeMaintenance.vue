<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>系统维护</el-breadcrumb-item>
            <el-breadcrumb-item>亮点类型维护</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">类型名称</span>
                    <el-input v-model="queryInfo.type" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                    <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                </div>
            </el-row>
            <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="type" label="类型名称" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="35%" :close-on-click-modal="false" class="dialogForm">
            <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="类型名称" prop="type">
                            <el-input v-model="form.type"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAndEidt">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { typeMaintenanceList, typeMaintenanceAdd, typeMaintenanceEdit, typeMaintenanceDel } from '@/api/engineering/system/public'

export default {
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                type: ""
            },
            tableData: [],//数据
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            form: {
                type: ""
            },
            formRules: {
                type: [{ required: true, message: "请填写类型名称", trigger: "blur", },]
            },
            rowData: [],
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            typeMaintenanceList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        search () {
            this.queryInfo.pageNum = 1
            this.getTableDataList()
        },
        add () { // 添加
            this.status = "add"
            this.title = "新增"
            this.form = {
                type: "",
            }
            this.dialogFormVisible = true
        },
        edit () { //  修改
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.status = "edit"
                this.title = "修改"
                this.form = {
                    type: this.rowData[0].type,
                }
                this.dialogFormVisible = true
            }
        },
        saveAndEidt () {  // 保存或者修改
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.status == 'edit') {
                        this.form.tyunId = this.rowData[0].tyunId
                        typeMaintenanceEdit(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.dialogFormVisible = false
                                this.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        typeMaintenanceAdd(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.dialogFormVisible = false
                                this.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    }
                }
            })
        },
        del () { // 题库列表删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {
                        typeMaintenanceDel(this.rowData[0].tyunId).then(res => {
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
