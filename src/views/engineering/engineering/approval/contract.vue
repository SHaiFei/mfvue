<template>
    <div>
        <el-row class="elRow">
            <div class="elRowLeft">
                <span class="font-12 spanText">所属区</span>
                <el-select clearable class="elinput200" v-model="queryInfo">
                    <el-option v-for='(item,index) in this.stateArr' :key='item.id' :label="item.label" :value="item.id">
                    </el-option>
                </el-select>
                <span class="font-12 spanText">合同名称</span>
                <el-input v-model="queryInfo.projectname" clearable class="elinput200"></el-input>
                <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
            </div>
            <div class="buttons">
                <el-button type="primary" size="small" @click="">查看</el-button>
                <el-button type="primary" size="small" icon="el-icon-download" @click="">下载</el-button>
            </div>
        </el-row>
        <el-table ref="multipleTable" :data="tableData2" stripe style="width:100%;margin-top: 10px" >
            <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
            <el-table-column prop="area" label="所属区" align="center"></el-table-column>
            <el-table-column prop="contractName" label="合同名称" align="center"></el-table-column>
            <el-table-column prop="date" label="签订日期" align="center"></el-table-column>
            <el-table-column prop="jname" label="甲方名称" align="center"></el-table-column>
            <el-table-column prop="yname" label="乙方名称" align="center"></el-table-column>
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
            tableData2: [
                { area: "通州区", contractName: "通州区老旧房屋修缮维修管理合同", date: "2018-07-06", jname: "通州区民防局", yname: "北京航天丰益信息技术有限公司", type: "消防安全" },
            ],//数据
            coursewareData: [],
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            options: [],
            isShow: false,
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
        clickRow (row, column, event) { //点击行
            this.$parent.$parent.$parent.isShow = true;
            this.$parent.$parent.$parent.coursewareData = [{ courseWareName: "通06-0583", planLearnTime: "东方玫瑰家园B1号楼裙房、B1号楼高层北段", courseWareType: "", learnState: "" }]
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
        subjectsType (val) { // 课题类型切换

        },

        saveAndEidt () {  // 添加时候的确定按钮

        },
        saveCommon () {

        },
        del () { // 题库列表删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
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
</style>
