<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>基本信息</el-breadcrumb-item>
            <el-breadcrumb-item>图层信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>统计分析</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">图层类别</span>
                    <el-select clearable class="elinput200">
                        <el-option>
                        </el-option>
                    </el-select>
                    <span class="font-12 spanText">展示方式</span>
                    <el-select clearable class="elinput200">
                        <el-option>
                        </el-option>
                    </el-select>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="searchBtn">查询</el-button>
                </div>
            </el-row>
        </div>

        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="35%" :close-on-click-modal="false" class="dialogForm">
            <el-form :model="form" label-width="auto" :rules="formRules" ref="form">

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
                type: '',
                name: "",
                content: "",
                tips: "",
                radio: "",
                xds: []
            },
            activeName: "maintenance1",
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

    },
    methods: {

        searchBtn () {
            this.getTableDataList()
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
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
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
