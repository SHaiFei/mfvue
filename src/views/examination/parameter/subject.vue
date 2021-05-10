<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>在线学习</el-breadcrumb-item>
            <el-breadcrumb-item>管理设置</el-breadcrumb-item>
            <el-breadcrumb-item>课目管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">课目名称</span>
                    <el-input v-model="queryInfo.name" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                    <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                </div>
            </el-row>
            <el-table :data="tableData" stripe style="width:100%;margin-top: 10px;" @selection-change='tableDataSelect' @row-click="clickRow" ref="multipleTable">
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="name" label="课目名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="subjecttypename" label="课目类型" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="majorname" label="专业课程" align="center">
                    <template slot-scope="scoped">
                        <div v-if="scoped.row.majorname == null"> - </div>
                        <div v-if="scoped.row.majorname != null"> {{ scoped.row.majorname }} </div>
                    </template>
                </el-table-column>
                <el-table-column prop="muluname" label="分类名称" align="center"></el-table-column>
                <el-table-column prop="yyyy" label="出台年份" align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>

            <!--  课件列表  -->
            <div v-show="courseware">
                <courseware :coursewareObj="coursewareObj"></courseware>
            </div>
        </div>

        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="35%" v-if="dialogFormVisible" :close-on-click-modal="false" class="dialogForm">
            <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
                <el-form-item label="课目类型" prop="subjecttype">
                    <el-select v-model="form.subjecttype" placeholder="请选择" @change="subjectsType">
                        <el-option v-for='(item,index) in this.stLi' :key='item.id' :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业课程" v-if="professional == true" prop="major">
                    <el-select v-model="form.major" placeholder="请选择">
                        <el-option v-for='(item,index) in this.mLi' :key='item.ID' :label="item.NAME" :value="item.ID" v-cloak>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课目名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="课目分类" prop="muluid">
                    <el-select v-model="form.muluid" placeholder="请选择">
                        <el-option v-for='(item,index) in this.classificationList' :key='item.ID' :label="item.NAME" :value="item.ID" v-cloak>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出台年份" prop="yyyy">
                    <el-date-picker v-model="form.yyyy" type="year" placeholder="选择年" value-format="yyyy">
                    </el-date-picker>
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
import {
    subjectList, professional, addProfessional, editProfessional, delProfessional, classification
} from '@/api/examination/subject'
import { stList } from '@/api/examination/maintenance'
import courseware from './courseware'


export default {
    components: {
        courseware
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 5,
                pageNum: 1,
                name: ""
            },
            coursewareObj: {
                id: ""
            },
            professional: false,
            stLi: [],
            mLi: [], //专业
            classificationList: [], // 分类列表
            tableData: [],//表格数据
            tableData2: [],
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            form: {
                name: "",//课目名称
                subjecttype: "",//课目id
                major: "",//专业课程id
                muluid: "",
                yyyy: ""
            },
            formRules: {
                name: [{ required: true, message: "请填写课目名称", trigger: "blur" }],
                subjecttype: [{ required: true, message: "请选择课目类型", trigger: "blur" }],
                muluid: [{ required: true, message: "请选择课目分类", trigger: "blur" }],
                yyyy: [{ required: true, message: "请选择出台年份", trigger: "blur" }]
            },
            rowData: [], //  行数据
            status: "",
            courseware: false
        }
    },
    created () {
        this.getTableDataList() // 列表
    },
    methods: {
        getTableDataList () { // 题库维护列表
            subjectList(this.queryInfo).then(res => {
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
        clickRow (row, column, event) { //点击行
            this.coursewareObj.id = row.id
            this.courseware = true
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
            if (val == 2) {  // 如果是专业课程
                this.professional = true
                this.professionalList()
            } else {
                this.professional = false
            }
        },
        professionalList () {
            professional().then(res => {
                if (res.code == 200) {
                    this.mLi = res.data;
                    console.log(res);
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        add () { // 添加
            this.stListFn()
            this.getClassification()
            this.title = '增加'
            this.status = 'add'
            this.professional = false
            this.form = {
                name: "",//课目名称
                subjecttype: "",//课目id
                major: "",//专业课程id
                muluid: "",
                yyyy: ""
            }
            this.dialogFormVisible = true
        },
        edit () {
            if (this.rowData.length != 1) {
                this.prompt()
            } else {
                this.stListFn()
                this.getClassification()
                if (this.rowData[0].subjecttype == 2) {  // 如果是专业课程
                    this.professional = true
                    this.professionalList()
                } else {
                    this.professional = false
                }
                this.title = '编辑'
                this.status = 'edit'
                this.dialogFormVisible = true
                this.form.name = this.rowData[0].name
                this.form.major = this.rowData[0].major
                this.form.subjecttype = this.rowData[0].subjecttype
                this.form.muluid = this.rowData[0].muluid
                this.form.yyyy = this.rowData[0].yyyy
            }
        },
        del () { // 删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {
                        delProfessional(this.rowData[0].id).then(res => {
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
        saveAndEidt () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.status == 'add') {
                        addProfessional(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.dialogFormVisible = false
                                this.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        this.form.id = this.rowData[0].id
                        editProfessional(this.form).then(res => {
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
        //点击分页
        handleCurrentChange (newPage) {  //分页当前页
            this.queryInfo.pageNum = newPage
            this.getTableDataList()
        },
        handleSizeChange (newSize) {   //分页每页显示条数
            this.queryInfo.pageSize = newSize
            this.getTableDataList()
        },
        getClassification () { // 课目分类
            classification().then(res => {
                if (res.code == 200) {
                    this.classificationList = res.data
                }
            })
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
        prompt () {
            return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
        }
    }
};
</script>
<style lang="less" scoped>
::v-deep .dialogForm .el-select, .el-date-editor--year {
    width: 100% !important;
}
.el-form-item {
    margin-left: 5px;
}
.el-select,
.el-input--suffix {
    width: 200px;
}
</style>
