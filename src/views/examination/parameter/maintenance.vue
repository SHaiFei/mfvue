<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>在线考试</el-breadcrumb-item>
            <el-breadcrumb-item>考试管理</el-breadcrumb-item>
            <el-breadcrumb-item>题库管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs type="border-card" style="height: 100%">
            <el-tab-pane label="题库管理">
                <el-row class="elRow">
                    <div class="elRowLeft">
                        <span class="font-12 spanText">课目类型</span>
                        <el-select v-model="queryInfo.subjecttype" placeholder="请选择" @change="subjectsType" clearable class="elinput200">
                            <el-option v-for='(item,index) in this.stLi' :key='item.id' :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                        <span class="font-12 spanText">课目名称</span>
                        <el-select v-model="queryInfo.subjectid" placeholder="请选择" clearable class="elinput200">
                            <el-option v-for='(item,index) in this.mLi' :key='item.ID' :label="item.NAME" :value="item.ID">
                            </el-option>
                        </el-select>
                        <el-button type="primary" size="small" icon="el-icon-search" @click="search">
                            查询
                        </el-button>
                    </div>
                    <div class="buttons" style="float: right">
                        <el-button type="primary" size="small" icon="el-icon-plus" class="rightBtn" @click="add">
                            增加
                        </el-button>
                        <el-button type="success" size="small" icon="el-icon-edit" class="rightBtn" @click="edit">
                            修改
                        </el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete" class="rightBtn" @click="del">
                            删除
                        </el-button>
                    </div>
                </el-row>
                <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @row-click="clickRow" @selection-change='tableDataSelect' @row-dblclick="detailedContent">
                    <el-table-column type="selection" width="50" align="center"></el-table-column>
                    <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                    <el-table-column prop="name" label="题库名称" align="center"></el-table-column>
                    <el-table-column prop="subjecttypename" label="课目类型" align="center"></el-table-column>
                    <el-table-column prop="subjectname" label="课目名称" align="center" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="c1" label="试题数量" align="center" width="150px"></el-table-column>
                    <el-table-column prop="createTime" label="添加时间" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <div class="preview" @click="detailedContent(scope.row)">添加试卷</div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="all-block-pager">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
                <!-- </div> -->
            </el-tab-pane>
            <el-tab-pane label="试卷管理" disabled></el-tab-pane>
        </el-tabs>
        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="35%" v-if="dialogFormVisible" :close-on-click-modal="false" class="dialogForm">
            <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
                <el-form-item label="题库名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="课目类型" prop="subjecttype">
                    <el-select v-model="form.subjecttype" placeholder="请选择" @change="subjectsType">
                        <el-option v-for='(item,index) in this.stLi' :key='item.id' :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课目名称" prop="subjectid">
                    <el-select v-model="form.subjectid" placeholder="请选择">
                        <el-option v-for='(item,index) in this.mLi' :key='item.ID' :label="item.NAME" :value="item.ID" v-cloak>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAndEidt">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tkList, stList, mList, addExamstock, editExamstock, delExamstock } from '@/api/examination/maintenance'

export default {
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                subjecttype: "", // 查询 课目类型
                subjectid: ""  // 查询  课目名称
            },
            tableData: [],//表格数据
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            stLi: [], // 课目类型
            mLi: [],//所属课目
            form: {
                name: "",//题库名称
                subjecttype: "",//课目类型
                subjectid: "",//所属课目
                subjectname: ""
            },
            formRules: {
                name: [{ required: true, message: "请填写题库名称", trigger: "blur" }],
                subjecttype: [{ required: true, message: "请选择课目类型", trigger: "blur" }],
                subjectid: [{ required: true, message: "请选择课目名称", trigger: "blur" }]
            },
            rowData: [], //  行数据
            status: "",  // 状态  判断是添加还是修改
        }
    },
    created () {
        this.getTableDataList() // 列表
        this.stListFn() // 查询内容
        this.mListFn({ subjecttype: 1 })// 默认请求公共课程下的 数据 防止课目名称修改时id 闪烁问题
    },
    methods: {
        getTableDataList () { // 题库维护列表
            tkList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        search () {  // 查询
            this.getTableDataList()
        },
        add () { // 添加
            this.stListFn()
            this.title = '增加'
            this.status = 'add'
            this.form = {
                name: "",//题库名称
                subjecttype: "",//课目类型
                subjectid: "",//所属课目
                subjectname: ""
            }
            this.dialogFormVisible = true
        },
        edit () { //  修改
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.stListFn()
                this.mListFn({ subjecttype: this.rowData[0].subjecttype })
                this.title = '编辑'
                this.status = 'edit'
                this.form.name = this.rowData[0].name
                this.form.subjectid = Number(this.rowData[0].subjectid)
                this.form.subjectname = this.rowData[0].subjectname
                this.form.subjecttype = Number(this.rowData[0].subjecttype)
                this.dialogFormVisible = true
            }
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
        detailedContent (row, column, event) { // 双击行
            this.$router.push({ path: '/examination/questions', query: { stockid: row.id } })
        },
        subjectsType (val) { // 课题类型切换
            let params = { subjecttype: val }
            this.mListFn(params)
        },
        saveAndEidt () {  // 添加时候的确定按钮
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.status == 'add') {
                        addExamstock(this.form).then(res => {
                            if (res.code == 200) {
                                this.dialogFormVisible = false
                                this.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        this.form.id = this.rowData[0].id
                        editExamstock(this.form).then(res => {
                            if (res.code == 200) {
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
                        delExamstock(this.rowData[0].id).then(res => {
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
        //查询
        search () {
            // this._getData();
        },
        //课目类型接口
        stListFn () {
            stList().then(res => {
                if (res.code == 200) {
                    this.stLi = res.data;
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        // 科目名称
        mListFn (param) {
            mList(param).then(res => {
                if (res.code == 200) {
                    this.mLi = res.data;
                } else {
                    this.msgError(res.msg)
                }
            });
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
