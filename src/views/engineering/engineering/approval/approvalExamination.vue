<template>
    <div>
        <el-row class="elRow">
            <div class="elRowLeft">
                <span class="font-12 spanText">接收单位</span>
                <el-select clearable class="elinput200" v-model="queryInfo">
                    <el-option v-for='(item,index) in stateArr' :key='item.id' :label="item.label" :value="item.id">
                    </el-option>
                </el-select>
                <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
            </div>
        </el-row>
        <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @row-click="clickRow" @selection-change='tableDataSelect' :row-class-name="tableRowClassName">
            <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
            <el-table-column prop="contractName" label="接收单位" align="center"></el-table-column>
            <el-table-column prop="date" label="移交单位" align="center"></el-table-column>
            <el-table-column prop="jname" label="工程数量" align="center"></el-table-column>
            <el-table-column prop="yname" label="移交时间" align="center"></el-table-column>
            <el-table-column prop="type" label="操作" align="center"></el-table-column>
        </el-table>
        <div class="all-block-pager">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { questionList, questionType, addQuestion, editQuestion, delQuestion } from '@/api/examination/questions'
export default {
    watch: {

    },
    data () {
        return {
            stateArr: [
                { id: 1, label: "北京市通州区民防局" },
            ],
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                projectname: ""
            },
            tableData: [
                { area: "通州区", contractName: "北京市通州区民防局", date: "北京市民防局", jname: "1", yname: "2018-01-31", type: "已接收入库" },
                { area: "通州区", contractName: "北京市通州区民防局", date: "北京市民防局", jname: "2", yname: "2018-01-31", type: "已接收入库" },
            ],//数据
            coursewareData: [],
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            form: {},
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

        },
        add () { // 添加

        },
        edit () { //  修改
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            }
        },
        del () { // 题库列表删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            }
        },
        clickRow (row, column, event) { //点击行
            this.$parent.$parent.$parent.isShow = true;
            if (row.jname == 2) {
                this.$parent.$parent.$parent.coursewareData = [{ courseWareName: "通06-0582", planLearnTime: "北京工具厂经济适用房项目6号配套公建楼", courseWareType: "", learnState: "" },
                { courseWareName: "通06-0541", planLearnTime: "通州区临河里22#地下车库（东方玫瑰家园BCK号车库）", courseWareType: "", learnState: "" },]
            } else {
                this.$parent.$parent.$parent.coursewareData = [{ courseWareName: "通06-0583", planLearnTime: "东方玫瑰家园B1号楼裙房、B1号楼高层北段", courseWareType: "", learnState: "" }]
            }
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
        tableDataSelect (val) {
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        tableRowClassName ({ row, rowIndex }) {
            // let color = ""
            // this.rowData.forEach((item) => {
            //     if (item.id == row.id) {
            //         color = "tableSelectedRowBgcolor";
            //     }
            // });
            // return color
        },
        saveAndEidt () {  // 添加时候的确定按钮

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
<style lang="scss" scoped>
</style>
