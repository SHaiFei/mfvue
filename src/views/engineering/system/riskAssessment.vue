<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>系统维护</el-breadcrumb-item>
            <el-breadcrumb-item>风险评估维护</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">场所类型</span>
                    <el-input v-model="queryInfo.projectcode" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">代码</span>
                    <el-input v-model="queryInfo.racode" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">风险因素</span>
                    <el-input v-model="queryInfo.rfactor" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                    <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                </div>
            </el-row>
            <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect' :span-method="dataSpanMethod" border>
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="content" label="场所类型" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.sistType == '1'">宣传教育场所</div>
                        <div v-if="scope.row.sistType == '2'">物资储备场所</div>
                        <div v-if="scope.row.sistType == '3'">办公场所</div>
                        <div v-if="scope.row.sistType == '4'">停车和交通场所</div>
                        <div v-if="scope.row.sistType == '5'">商业场所</div>
                        <div v-if="scope.row.sistType == '6'">文化体育场所</div>
                        <div v-if="scope.row.sistType == '7'">旅馆和集体员工宿舍</div>
                        <div v-if="scope.row.sistType == '8'">部分闲置人防工程</div>
                    </template>
                </el-table-column>
                <el-table-column prop="racode" label="代码" align="center"></el-table-column>
                <el-table-column prop="rfactor" label="风险因素" align="center"></el-table-column>
                <el-table-column prop="analysis" label="风险因素分析" align="center" width="800"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="40%" :close-on-click-modal="false" class="dialogForm">
            <riskAssessmentForm v-if="status == 'add'" @closeDialog="closeDialog"></riskAssessmentForm>
            <riskAssessmentForm v-else :rowData="rowData" @closeDialog="closeDialog"></riskAssessmentForm>
        </el-dialog>
    </div>
</template>

<script>
import { riskList, riskDel } from '@/api/engineering/system/public'

import riskAssessmentForm from "./riskAssessment/riskAssessmentForm"
export default {
    components: {
        riskAssessmentForm
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                rfactor: "",
                racode: "",
            },
            tableData: [],//数据
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            rowData: [],
            rowSpan: 0,
            spanArr: [],
            position: 0
        }
    },
    created () {
        this.getTableDataList()
    },
    mounted () {
        setTimeout(() => {
            this.rowspan()
        }, 500)
    },
    methods: {
        getTableDataList () { // 题库维护列表
            riskList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        search () {
            this.queryInfo.pageNum = 1
            this.getTableDataList()
        },
        add () { // 添加
            this.status = "add"
            this.title = "新增"
            this.dialogFormVisible = true
        },
        edit () { //  修改
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.status = "edit"
                this.title = "修改"
                this.dialogFormVisible = true
            }
        },
        del () { // 题库列表删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {
                        riskDel(this.rowData[0].rasId).then(res => {
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
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        closeDialog () {
            this.dialogFormVisible = false
        },
        rowspan () {
            this.spanArr = [];
            let data = this.tableData
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                if (i === 0) {
                    // 如果是第一条记录（即索引是0的时候），向数组中加入１
                    this.spanArr.push(1);
                    this.position = 0;
                } else {
                    if (data[i].sistType === data[i - 1].sistType) {
                        // 如果sistType相等就累加，并且push 0  这里是根据一样的sistType匹配
                        this.spanArr[this.position] += 1;
                        this.spanArr.push(0);
                    } else {
                        // 不相等push 1
                        this.spanArr.push(1);
                        this.position = i;
                    }
                }
            }
            console.log(this.spanArr);
        },
        dataSpanMethod ({ row, column, rowIndex, columnIndex }) {
            // 合并第二行
            if (columnIndex === 2) {
                const _row = this.spanArr[rowIndex];
                return {
                    rowspan: _row,
                    colspan: 1
                };
            }
            // if (columnIndex === 5){
            //     const _row = this.spanArr[rowIndex];
            //     const _col = _row > 0 ? 1 : 0;
            //     return {
            //         rowspan: _row,
            //         colspan: _col
            //     };
            // }
        },
        //点击分页
        handleCurrentChange (newPage) {  //分页当前页
            this.queryInfo.pageNum = newPage
            this.getTableDataList()
            this.rowspan()
        },
        handleSizeChange (newSize) {   //分页每页显示条数
            this.queryInfo.pageSize = newSize
            this.getTableDataList()
            this.rowspan()
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
