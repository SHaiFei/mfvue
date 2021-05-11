<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>在线考试</el-breadcrumb-item>
            <el-breadcrumb-item>考试管理</el-breadcrumb-item>
            <el-breadcrumb-item>试卷管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="题库管理" name="maintenance"></el-tab-pane>
            <el-tab-pane label="试卷管理" name="questions">
                <el-row class="elRow">
                    <div class="elRowLeft">
                        <span class="font-12 spanText">试题题干</span>
                        <el-input v-model="queryInfo.content" clearable class="elinput200"></el-input>
                        <span class="font-12 spanText">试题类型</span>
                        <el-select v-model="queryInfo.type" placeholder="请选择" clearable class="elinput200">
                            <el-option v-for='(item,index) in this.type' :key='item.CODE' :label="item.NAME" :value="item.CODE" :data-name='item.NAME'>
                            </el-option>
                        </el-select>
                        <el-button type="primary" size="small" icon="el-icon-search" @click="searchBtn">
                            查询
                        </el-button>
                    </div>
                    <div class="buttons">
                        <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                        <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                    </div>
                </el-row>
                <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @row-click="clickRow" @selection-change='tableDataSelect'>
                    <el-table-column type="selection" width="50" align="center"></el-table-column>
                    <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                    <el-table-column prop="content" label="试题题干" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="type" label="试题类型" align="center"></el-table-column>
                    <el-table-column prop="daan" label="答案" align="center"></el-table-column>
                    <el-table-column prop="tips" label="解析" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="createTime" label="添加时间" align="center"></el-table-column>
                </el-table>
                <div class="all-block-pager">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>

        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="35%" :close-on-click-modal="false" class="dialogForm">
            <el-form :model="form" label-width="90px" :rules="formRules" ref="form">
                <el-form-item label="试题类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择" @change="subjectsType">
                        <el-option v-for='(item,index) in this.type' :key='item.CODE' :label="item.NAME" :value="item.CODE" :data-name='item.NAME'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="试题题干" prop="content">
                    <el-input v-model="form.content" type="textarea"></el-input>
                </el-form-item>
                <!-- 单选题 -->
                <el-form-item label="增删选项" prop="name" v-show="form.type == 1">
                    <el-button @click="addDomain" style="margin-left: 5px;margin-bottom: 10px">添加</el-button>
                    <el-button @click="removeDomain" style="margin-left: 10px;">删除</el-button>
                    <el-row :gutter="24">
                        <el-form-item :label="'选项' + domain.id" v-for="(domain, index) in domains" :key="domain.key" style="margin-bottom: 10px">
                            <el-col :span="22">
                                <el-input maxlength="200" class="dynamicInput" v-model="domain.val" style=""></el-input>
                            </el-col>
                            <el-radio-group v-model="form.radio" @change="radioGroupChange">
                                <el-radio :label="domain.id"><span></span></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                </el-form-item>
                <!-- 多选题 -->
                <el-form-item label="增删选项" v-show="form.type == 2">
                    <el-button @click="addDomain" style="margin-left: 5px;margin-bottom: 10px">添加</el-button>
                    <el-button @click="removeDomain" style="margin-left: 10px;">删除</el-button>
                    <el-row :gutter="24">
                        <el-form-item :label="'选项' + domain.id" v-for="(domain, index) in domains" :key="domain.key" style="margin-bottom: 10px">
                            <el-col :span="22">
                                <el-input maxlength="200" class="dynamicInput" v-model="domain.val"></el-input>
                            </el-col>
                            <el-col :span="2">
                                <el-checkbox :label="domain.id" v-model="domain.re"><span></span></el-checkbox>
                            </el-col>
                        </el-form-item>
                    </el-row>
                </el-form-item>
                <el-form-item label="标准答案" prop="daan" v-show="form.type == 4">
                    <el-radio v-model="isradio" label="A">正确</el-radio>
                    <el-radio v-model="isradio" label="B">错误</el-radio>
                </el-form-item>
                <el-form-item label="标准答案" prop="daan" v-show="form.type != 4&&form.type != 2&&form.type != 1">
                    <el-input v-model="form.daan" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="试题解析" prop="tips">
                    <el-input v-model="form.tips" type="textarea"></el-input>
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
import { questionList, questionType, addQuestion, editQuestion, delQuestion } from '@/api/examination/questions'
export default {
    watch: {
        'activeName': function (val) { //监听切换状态-计划单
            if (val == 'maintenance') {
                this.$router.push({ path: '/examination/maintenance' })
            }
        },
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                content: "",
                type: ""
            },
            activeName: "questions",
            tableData: [],//数据
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            options: [],
            form: {
                type: '',
                name: "",
                content: "",
                tips: "",
                radio: "",
                xds: []
            },
            domains: [],
            isradio: "A",
            type: [],
            checkList: [],
            tfList: [],
            formRules: {
                tips: [{ required: true, message: "请输入试题解析", trigger: "blur", },],
                content: [{ required: true, message: "请输入试题题干", trigger: "blur", },],
                type: [{ required: true, message: "请选择试题类型", trigger: "blur", },],
            },
            rowData: [],
            time: "",
            status: "",
            stockid: ""
        }
    },
    created () {
        this.getTableDataList()
        this.addType() // 获取试题类型
        this.stockid = this.$route.query.stockid  // 获取点击行的id
    },
    methods: {
        addDomain () { // 添加 单选多选
            if (this.domains.length >= 9) {
                return this.msgWarning("选项过多!")
            } else {
                this.domains.push({
                    value: '',
                    id: this.options[this.domains.length],
                    re: false,
                })
            }
        },
        searchBtn () {
            this.getTableDataList()
        },
        removeDomain (item) { // 删除动态添加
            this.domains.pop()
        },
        getTableDataList () { // 题库维护列表
            this.queryInfo.stockid = this.$route.query.stockid
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
            this.options = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
            this.addType()
            this.title = '增加'
            this.status = 'add'
            this.form = {
                type: '',
                name: "",
                content: "",
                tips: "",
                radio: "",
                xds: []
            }
            this.domains = []
            this.dialogFormVisible = true
        },
        edit () { //  修改
            this.options = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
            this.addType()
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.title = '编辑'
                this.status = 'edit'
                this.form.content = this.rowData[0].content
                this.form.tips = this.rowData[0].tips
                this.form.type = this.rowData[0].typecode
                this.form.daan = this.rowData[0].daan
                if (this.rowData[0].xx != null) {
                    let xx = JSON.parse(this.rowData[0].xx)
                    this.domains = xx.map(item => {
                        if (item.re == 'true') {
                            item.re = true
                            this.form.radio = item.id
                        } else {
                            item.re = false
                        }
                        return item
                    })
                }
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
        subjectsType (val) { // 课题类型切换
            this.domains.length = 0
            this.options = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
        },
        radioGroupChange (val) { // 单选改变
            this.domains.forEach((item, index) => {
                if (item.id == val) {
                    this.domains[index].re = true
                } else {
                    this.domains[index].re = false
                }
            })
        },
        saveAndEidt () {  // 添加时候的确定按钮
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.form.xds = []
                    this.form.stockid = this.stockid
                    if (this.status == 'add') {
                        // let domains = this.domains
                        this.saveCommon()
                        addQuestion(this.form).then(res => {
                            if (res.code == 200) {
                                this.dialogFormVisible = false
                                this.msgSuccess(res.msg)
                                this.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        this.form.id = this.rowData[0].id
                        this.saveCommon()
                        editQuestion(this.form).then(res => {
                            if (res.code == 200) {
                                this.dialogFormVisible = false
                                this.msgSuccess(res.msg)
                                this.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    }
                }
            })
        },
        saveCommon () {
            let domains = this.domains
            for (var i = 0; i < domains.length; i++) {
                let params = {}
                params.val = domains[i].val
                params.id = domains[i].id
                params.re = domains[i].re
                this.form.xds.push(params)
            }
            if (this.form.type == 4) {
                var paramsArr = [
                    { val: '正确', id: 'A', re: false },
                    { val: '错误', id: 'B', re: false }
                ]
                for (var i = 0; i < paramsArr.length; i++) {
                    let params = {}
                    params.val = paramsArr[i].val
                    params.id = paramsArr[i].id
                    this.form.xds.push(params)
                }
                if (this.isradio == "A") {
                    this.form.xds[0].re = true
                    this.form.xds[1].re = false
                } else {
                    this.form.xds[0].re = false
                    this.form.xds[1].re = true
                }
            }
        },
        del () { // 题库列表删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {
                        delQuestion(this.rowData[0].id).then(res => {
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
        addType () { // 获取试题类型
            questionType().then(res => {
                if (res.code == 200) {
                    this.type = res.data
                } else {
                    this.msgError(res.msg)
                }
            })
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
