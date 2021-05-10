<template>
    <div class="all-data-detail">
        <tab-pane :paneList="paneList"></tab-pane>
        <div v-show="isShow" style="margin-top: 15px">
            <el-table stripe :data="coursewareData" style="width: 100%">
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column prop="courseWareName" label="工程编号" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="planLearnTime" label="工程名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="courseWareType" label="建设时间" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="learnState" label="竣工时间" align="center" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination layout="total, prev, pager, next, jumper" class="pagination" background @current-change="handleCurrentChange" :total="total" :page-size="6">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { questionList, questionType, addQuestion, editQuestion, delQuestion } from '@/api/examination/questions'
import approvalExamination from './approval/approvalExamination'
import contract from './approval/contract'

import TabPane from '@/components/tabPane'
export default {
    components: {
        approvalExamination, contract, TabPane
    },
    data () {
        return {
            paneList: [ // tab页签 数据
                { name: "tabPane1", label: "行政审批", flag: true, content: approvalExamination },
                { name: "tabPane2", label: "合同管理", flag: false, content: contract }
            ],
            stateArr: [
                { id: 1, label: "北京市通州区民防局" },
            ],
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
            },
            tableData: [
                { area: "通州区", contractName: "北京市通州区民防局", date: "北京市民防局", jname: "1", yname: "2018-01-31", type: "已接收入库" },
                { area: "通州区", contractName: "北京市通州区民防局", date: "北京市民防局", jname: "2", yname: "2018-01-31", type: "已接收入库" },
            ],//数据
            tableData2: [
                { area: "通州区", contractName: "通州区老旧房屋修缮维修管理合同", date: "2018-07-06", jname: "通州区民防局", yname: "北京航天丰益信息技术有限公司", type: "消防安全" },
            ],//数据
            total: 0,//分页总数
            isShow: false,
            coursewareData: []
        }
    },
    created () {
    },
    methods: {
        searchBtn () {
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
            this.isShow = true;
            if (row.jname == 2){
                this.coursewareData = [{ courseWareName: "通06-0582", planLearnTime: "北京工具厂经济适用房项目6号配套公建楼", courseWareType: "", learnState: "" },
                { courseWareName: "通06-0541", planLearnTime: "通州区临河里22#地下车库（东方玫瑰家园BCK号车库）", courseWareType: "", learnState: "" },]
            } else {
                this.coursewareData = [{ courseWareName: "通06-0583", planLearnTime: "东方玫瑰家园B1号楼裙房、B1号楼高层北段", courseWareType: "", learnState: "" }]
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
.dialogForm .el-select {
    width: 100%;
}
.el-form-item {
    margin-left: 5px;
}

</style>
