<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>在线考试</el-breadcrumb-item>
            <el-breadcrumb-item>考试管理</el-breadcrumb-item>
            <el-breadcrumb-item>试卷管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">试卷名称</span>
                    <el-input v-model="queryInfo.name" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">发布状态</span>
                    <el-select v-model="queryInfo.state" placeholder="请选择" clearable class="elinput200">
                        <el-option v-for='(item,index) in this.stateArr' :key='item.id' :label="item.label" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">
                        查询
                    </el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                    <el-button type="success" size="small" icon="el-icon-s-promotion" @click="release">发布</el-button>
                    <el-button type="warning" size="small" icon="" @click="cancelRelease">取消发布</el-button>
                    <el-button type="primary" size="small" icon="el-icon-view" @click="preview">查看</el-button>
                </div>
            </el-row>
            <el-table :data="tableData" stripe style="width:100%;margin-top: 10px;" @row-click="clickRow" ref="multipleTable" @selection-change='tableDataSelect'>
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="name" label="试卷名称" align="center"></el-table-column>
                <el-table-column prop="subjectname" label="课目名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="grade" label="试卷总分" align="center" width="150px"></el-table-column>
                <el-table-column prop="gradei" label="及格分数" align="center" width="150px"></el-table-column>
                <el-table-column prop="rn" label="试题数量" align="center" width="150px"></el-table-column>
                <el-table-column prop="state" label="发布状态" align="center" width="150px"></el-table-column>
                <el-table-column prop="time" label="考试时长(分钟)" align="center" width="200px"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { paperkList, paperRelease, cancelRelease, delExampaper } from '@/api/examination/managment'
export default {
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                state: "", // 查询条件  状态
                name: ""
            },
            tableData: [],//数据
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            form: {},
            formRules: {},
            stateArr: [
                { label: '已发布', id: 'Y' },
                { label: '未发布', id: 'N' }
            ],
            rowData: [],  // 行数据
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            paperkList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        search () {
            this.getTableDataList()
        },
        add () { // 添加
            this.$router.push({ path: '/examination/managementAdd' })
        },
        edit () {
            if (this.rowData.length != 1) {
                this.prompt()
            } else {
                this.stListFn()
                this.title = '编辑'
                this.status = 'edit'
                this.dialogFormVisible = true
                this.form.name = this.rowData[0].name
                this.form.subjectid = this.rowData[0].subjectid
                this.form.subjecttype = this.rowData[0].subjecttype
            }
        },
        del () { // 删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {
                        delExampaper(this.rowData.id).then(res => {
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
        release () { // 发布操作
            if (this.rowData.length != 1) {
                this.prompt()
            } else {
                this.msgBox('确定发布?').then(res => {
                    if (res == 'confirm') {
                        paperRelease({ id: this.rowData[0].id }).then(res => {
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
        cancelRelease () { // 取消发布
            if (this.rowData.length != 1) {
                this.prompt()
            } else {
                this.msgBox('确定取消发布?').then(res => {
                    if (res == 'confirm') {
                        cancelRelease({ id: this.rowData[0].id }).then(res => {
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
        preview () {  // 查看内容
            if (this.rowData.length != 1) {
                this.prompt()
            } else {
                let params = {
                    id: this.rowData[0].id
                }
                this.$router.push({ path: '/examination/preview', query: { res: JSON.stringify(params) } })
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
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        prompt () {
            return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
        }
    }
};
</script>
<style lang="scss" scoped>
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

::v-deep .el-table__body tr.tableSelectedRowBgcolor > td {
    background-color: #ffe48d !important;
}
</style>
