<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>基本信息</el-breadcrumb-item>
            <el-breadcrumb-item>查询分析</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">信息类别</span>
                    <el-select clearable class="elinput200">
                        <el-option>
                        </el-option>
                    </el-select> 
                    <span class="font-12 spanText">所属区县</span>
                    <el-select clearable class="elinput200">
                        <el-option>
                        </el-option>
                    </el-select>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
            </el-row>
            <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="area" label="区县" align="center"></el-table-column>
                <el-table-column prop="contractName" label="工程编号" align="center"></el-table-column>
                <el-table-column prop="date" label="详细地址" align="center"></el-table-column>
                <el-table-column prop="yname" label="竣工日期" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="35%" :close-on-click-modal="false" class="dialogForm">
            <el-form :model="form" label-width="auto" :rules="formRules" ref="form">

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">保 存</el-button>
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
        search () {
            this.getTableDataList()
        },
        getTableDataList () { // 列表
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
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        save () {  // 添加时候的确定按钮
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
