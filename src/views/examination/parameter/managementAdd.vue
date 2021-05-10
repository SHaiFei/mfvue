<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>在线考试</el-breadcrumb-item>
            <el-breadcrumb-item>考试管理</el-breadcrumb-item>
            <el-breadcrumb-item>试卷管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin: 30px 50px;padding: 30px; border: 1px solid #999">
            <el-form label-width="auto" ref="form" :rules="formRules" :model="form">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="试卷名称" prop="name">
                            <el-input v-model="form.name" placeholder="试卷名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="试题总分" prop="grade">
                            <el-input v-model="form.grade" disabled placeholder="试题总分"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="课目类型" prop="subjecttype">
                            <el-select v-model="form.subjecttype" placeholder="请选择" @change="subjectsType">
                                <el-option v-for='(item,index) in this.stLi' :key='item.id' :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="考试时长(分钟)" prop="time">
                            <el-input v-model="form.time" placeholder="考试时长(分钟)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="所属课目" prop="subjectid">
                            <el-select v-model="form.subjectid" placeholder="请选择">
                                <el-option v-for='(item,index) in this.mLi' :key='item.ID' :label="item.NAME" :value="item.ID" >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="及格分数" prop="gradei">
                            <el-input v-model="form.gradei" placeholder="及格分数"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div>
                    <el-row>
                        <el-col :span="4">
                            <el-button type="primary" size="small" icon="el-icon-plus" @click="getQuestionList">选择试题库</el-button>
                        </el-col>
                        <el-col :span="18">
                            <el-input v-model="form.question"></el-input>
                        </el-col>
                    </el-row>

                    <el-row style="margin-top: 20px">
                        <el-col :span="4">
                            <el-button type="primary" size="small" icon="el-icon-plus" @click="questionsList">选择试题类型</el-button>
                        </el-col>
                        <el-col :span="18">
                            <el-table :data="tableData" style="width:100%" :header-cell-style="tableHeaderColor">
                                <el-table-column prop="NAME" label="试题类型" align="center"></el-table-column>
                                <el-table-column prop="num" label="试题数量" align="center"></el-table-column>
                                <el-table-column prop="grade" label="试题分数" align="center"></el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </div>
        <div style="text-align: center">
            <el-button type="primary" size="small" icon="" @click="preview">预 览</el-button>
            <el-button type="danger" size="small" icon="" @click="back">返 回</el-button>
        </div>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" :width="dialogWidth" :close-on-click-modal="false" class="dialogForm">
            <!-- <el-row :gutter="24">
                <el-col :span="12">
                    <el-tree :data="questionData" @node-click="handleNodeClick">
                        <span class="custom-tree-node" slot-scope="{node}">
                            <span>
                                {{ node.label }}<i :class="node.icon"></i>
                            </span>
                        </span>
                    </el-tree>
                </el-col>
                <el-col :span="12">
                    <div v-for="item in questionDataText" :key="item.id">{{ item.label }}</div>
                </el-col>
            </el-row> -->
            <div style="margin-left: 90px" v-if="status == 'questions'">
                <el-transfer v-model="transferArr" :data="questionData" :titles="['未选中', '已选中']" ></el-transfer>
            </div>
            <el-table ref="multipleTable" :data="tableQuestionData" style="width:100%" border class="tableQuestion" :header-cell-style="tableHeaderColor" v-if="status == 'examin'">
                <el-table-column type="index" align="center" width="60px"></el-table-column>
                <el-table-column prop="NAME" label="试题类型" align="center"></el-table-column>
                <el-table-column prop="NUM" label="可选数量" align="center"></el-table-column>
                <el-table-column prop="num" label="本次选择数量" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.num" @input='elInputChange(scope.row)' @focus="onInputFocus(scope.row, 'num')" @blur="onInputBlur(scope.row, 'num')"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="grade" label="试题分数" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.grade" @input='elInputChange(scope.row)' @focus="onInputFocus(scope.row, 'grade')" @blur="onInputBlur(scope.row, 'grade')"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <preview :previewData="previewData" v-if="status == 'preview'"></preview>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" class="savQuestionData" @click="savQuestionData">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import { examstockL, questionsList, exampaperYl, addExampaper } from '@/api/examination/managment'
import { stList, mList } from '@/api/examination/maintenance'

import preview from './preview.vue'
export default {
    components: {
        preview
    },
    data () {
        return {
            questionDataText: [],
            tableData: [], // 试题类型的表格数据
            transferArr: [], // 穿梭框的数据
            form: {
                name: "",
                question: "",
                gradei: "",
                time: "",
                grade: "",
                num: "",
                subjectid: "",
                subjecttype: ""
            },
            formRules: { // 表单验证
                name: [{ required: true, message: "请输入试卷名称", trigger: "blur", },],
                num: [{ required: true, message: "请输入试题数量", trigger: "blur", },],
                gradei: [{ required: true, message: "请输入及格分数", trigger: "blur", },],
                time: [{ required: true, message: "请输入考试时长", trigger: "blur", },],
                grade: [{ required: true, message: "请输入试题总分", trigger: "blur", },],
                subjectid: [{ required: true, message: "请选择所属课目", trigger: "blur", },],
                subjecttype: [{ required: true, message: "请选择课目类型", trigger: "blur", },],
            },
            dialogWidth: "", // 弹框宽度
            questionData: [], // 选择题库列表数据
            tableQuestionData: [],//选择试题表格数据
            title: "", // 弹框的提示
            dialogFormVisible: false,
            strategy: "",
            status: "", //  判断是 试题类型 还是 试题库或者是预览
            previewData: null, // 预览数据
            tuArr: [],
            questionIds: [], // 预览试题的id
            questionIdArr: [],
            stLi: [],
            mLi: [],
        }
    },
    created () {
        // 试题类型 给个默认的值
        this.tableData = [
            {
                NAME: "合计",
                num: "",
                grade: "",
            },
        ]
        this.stListFn() // 调用课目类型
    },
    moutend () { },
    methods: {
        questionsList () {// 根据题库获取试题类型
            this.title = "选择试题"
            this.status = 'examin'
            this.dialogWidth = '800px'
            this.dialogFormVisible = true
            this.tableQuestionData = []
            questionsList({ ids: this.transferArr.toString() }).then(res => {
                // questionsList({ ids: "70,71,33,35" }).then(res => {
                if (res.code == 200) {
                    let resData = res.data
                    resData.forEach(item => {
                        if (item.num == "" && item.grade == "") {
                            item.num = 0
                            item.grade = 0
                            this.tableQuestionData.push(item)
                        } else if (item.num == "") {
                            item.num = 0
                            this.tableQuestionData.push(item)
                        } else if (item.grade == "") {
                            item.grade = 0
                            this.tableQuestionData.push(item)
                        }
                    })
                } else {
                    this.msgError(res.msg)
                }
                this.tableQuestionData.push({ num: "", grade: "", NAME: "合计", NUM: "" })
            })
        },
        elInputChange (row) { // 表格输入框change事件
            var pattern = /^[1-9][0-9]*$/ // 正整数的正则表达式
            var patrn = /^\d*\.{0,1}\d{0,1}$/
            if (row.num != "" && !pattern.test(row.num)) {
                row.num = ""
                this.msgBox("试题数量只能是正整数!").then(res => { }).catch(e => e)
            }
            if (row.grade != "" && !patrn.test(row.grade)) {
                row.grade = ""
                this.msgBox("试题分数只能有一位小数!").then(res => { }).catch(e => e)
            }
            if (row.num > row.NUM) {
                row.num = ""
                this.msgBox("选择数量不能大于可选数量!").then(res => { }).catch(e => e)
            }
            let tableQuestionDatas = this.tableQuestionData
            let gradeSum = 0
            let numSum = 0
            tableQuestionDatas.forEach((item, index) => {
                if (index < tableQuestionDatas.length - 1) {
                    gradeSum += Number(item.num) * Number(item.grade)
                    numSum += Number(item.num)
                }
            })
            this.tableQuestionData[this.tableQuestionData.length - 1].num = numSum // 试题数量
            this.tableQuestionData[this.tableQuestionData.length - 1].grade = gradeSum // 试题总分
        },
        onInputFocus (row, state) { // 输入框聚焦验证
            if (state == 'num') {
                if (row.num == 0) {
                    row.num = ""
                }
            } else {
                if (row.grade == 0) {
                    row.grade = ""
                }
            }
        },
        onInputBlur (row, state) { // 输入框失去焦点验证
            if (state == 'num') {
                if (row.num == "") {
                    row.num = 0
                }
            } else {
                if (row.grade == "") {
                    row.grade = 0
                }
            }
        },
        getQuestionList () { // 获取题库列表
            this.status = 'questions' // 判断是题库还是试卷
            this.dialogWidth = '800px'
            this.title = "选择题库"
            this.questionData = [] // 清空题库列表
            this.transferArr = [] 
            examstockL().then(res => {
                if (res.code == 200) {
                    res.rows.forEach((item, index) => {
                        this.questionData.push({
                            key: item.id,
                            label: item.name
                        })
                    })
                } else {
                    this.msgError(res.msg)
                }
            })
            this.dialogFormVisible = true
        },
        savQuestionData () { // 弹框的保存按钮
            if (this.status == "questions") {  //题库
                let str = ""
                let questionData = this.questionData
                for (var i = 0; i < questionData.length; i++) {
                    for (var j = 0; j < questionData.length; j++) {
                        if (questionData[i].key == this.transferArr[j]) {
                            str += questionData[i].label + ','
                        }
                    }
                }
                this.form.question = str.substring(0, str.length - 1)
            } else if (this.status == 'examin') {
                this.form.num = this.tableQuestionData[this.tableQuestionData.length - 1].num
                this.form.grade = this.tableQuestionData[this.tableQuestionData.length - 1].grade
                this.tableData = this.tableQuestionData
            } else if (this.status == 'preview') {
                let params = {
                    stockidArr: this.transferArr,
                    tuArr: this.tuArr,
                    questionids: this.questionIds,
                    questionidArr: this.questionIdArr,
                    name: this.form.name,
                    grade: this.form.grade,
                    time: this.form.time,
                    gradei: this.form.gradei,
                    subjectid: this.form.subjectid
                }
                addExampaper(params).then(res => {
                    if (res.code == 200) {
                        this.$router.push({ path: "/examination/management" })
                        this.msgSuccess('操作成功')
                    } else {
                        this.msgError(res.msg)
                    }
                })
            }
            this.dialogFormVisible = false
        },
        preview () { // 预览功能
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.status = "preview"
                    this.title = "预览"
                    this.dialogWidth = '1200px'
                    this.tuArr = []
                    this.tableQuestionData.forEach(item => { //  获取题型  分数   试题数量
                        if (item.NAME != "合计") {
                            let params = {}
                            params.code = item.CODE
                            params.num = item.num
                            params.grade = item.grade
                            this.tuArr.push(params)
                        }
                    })
                    let params = {
                        name: this.form.name, // 试题名称
                        time: this.form.time, // 考试时长
                        gradei: this.form.gradei, // 试题总分
                        stockidArr: this.transferArr, // 试题库id
                        tuArr: this.tuArr // 试题类型数据
                    }
                    // 预览接口
                    exampaperYl(params).then(res => {
                        if (res.code == 200) {
                            // sessionStorage.setItem('previewData', JSON.stringify(res.data))
                            res.data.state = "previewData"
                            this.previewData = res.data
                            // 保存时候的试题id
                            for (var i = 0; i < res.data.arr.length; i++) {
                                for (var j = 0; j < res.data.arr[i].arr.length; j++) {
                                    let params = {
                                        questionid: res.data.arr[i].arr[j].id,
                                        type: res.data.arr[i].type
                                    }
                                    this.questionIdArr.push(params)
                                    this.questionIds.push(res.data.arr[i].arr[j].id)
                                }
                            }
                            this.dialogFormVisible = true
                        } else {
                            this.msgError(res.msg)
                        }
                    })
                }
            })
        },
        handleNodeClick (data) { // tree 的点击操作
            // if (data.)
            // questionDataText.forEach(item => {
            // })
            // console.log(data)
        },
        tableHeaderColor ({ row, column, rowIndex, columnIndex }) { // 试题类型表格表头的背景色
            if (rowIndex === 0) {
                return 'background-color: #E0ECFF;color: #000;font-weight: 500;'
            }
        },
        subjectsType (val) { // 课题类型切换
            let params = { subjecttype: val }
            this.mListFn(params)
        },
        stListFn () { //课目类型接口
            stList().then(res => {
                if (res.code == 200) {
                    this.stLi = res.data;
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        mListFn (param) {   // 所属课目
            mList(param).then(res => {
                if (res.code == 200) {
                    this.mLi = res.data;
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        back () { //返回上一层
            this.$router.go(-1)
        }
    },
}
</script>


<style lang='less' scoped>
.el-select {
    width: 100%;
}
.el-table th.gutter {
    display: table-cell !important;
}
</style>
