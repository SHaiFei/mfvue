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
                    <span class="font-12 spanText">所属区</span>
                    <areaCom ref="areaCom" class="elinput200"></areaCom>
                    <span class="font-12 spanText">工程编号</span>
                    <el-input v-model="queryInfo.underCode" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">工程名称</span>
                    <el-input v-model="queryInfo.underName" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">工程类别</span>
                    <el-input v-model="queryInfo.underType" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">战时用途</span>
                    <el-input v-model="queryInfo.warUse" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">使用用途</span>
                    <el-input v-model="queryInfo.useTarget" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">平时用途</span>
                    <el-input v-model="queryInfo.peaceUse" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">使用单位</span>
                    <el-input v-model="queryInfo.useUnit" clearable class="elinput200"></el-input>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-view" @click="gcCheck">查看工程</el-button>
                    <el-button type="primary" size="small" icon="el-icon-search">高级查询</el-button>
                </div>
            </el-row>
            <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="county" label="所属区" align="center"></el-table-column>
                <el-table-column prop="underCode" label="工程编号" align="center"></el-table-column>
                <el-table-column prop="street" label="街道" align="center"></el-table-column>
                <el-table-column prop="underName" label="工程名称" align="center"></el-table-column>
                <el-table-column prop="underType" label="工程类别" align="center"></el-table-column>
                <el-table-column prop="warUse" label="战时用途" align="center"></el-table-column>
                <el-table-column prop="useTarget" label="使用用途" align="center"></el-table-column>
                <el-table-column prop="peaceUse" label="平时用途" align="center"></el-table-column>
                <el-table-column prop="useUnit" label="使用单位" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>

            <!-- 弹窗 -->
            <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="50%" :close-on-click-modal="false" class="dialogForm">
                <engineering :rowData="rowData" @closeDialog="closeDialog"></engineering>
                <!-- <el-form :inline="true" label-width="110px" :model="form" class="demo-form-inline">
                    <el-form-item label="所属区">
                        <el-input v-model="form.county" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="工程编码">
                        <el-input v-model="form.underCode" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="工程名称">
                        <el-input v-model="form.underName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="街道（乡镇）">
                        <el-input v-model="form.street" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="路号">
                        <el-input v-model="form.roadNum" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="工程类别">
                        <el-input v-model="form.underType" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="场所类型">
                        <el-input v-model="form.underType" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="战时功能">
                        <el-input v-model="form.warUse" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="角点坐标">
                        <el-input v-model="form.corner" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="结构形式">
                        <el-input v-model="form.structural" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="人防工程施工图备案通知单号">
                        <el-input v-model="form.adviceNumber" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="是否验收">
                        <el-input v-model="form.accYn" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="总建筑面积">
                        <el-input v-model="form.fioorArea" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="人防建筑面积">
                        <el-input v-model="form.underArea" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="人防室外口及通道面积">
                        <el-input v-model="form.channelArea" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="人防地面管理用房面积">
                        <el-input v-model="form.fioorArea" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="抗力等级">
                        <el-input v-model="form.resistanceGrade" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="防化等级">
                        <el-input v-model="form.chemicalGrade" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="地下层数">
                        <el-input v-model="form.underLayerNum" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="地上层数">
                        <el-input v-model="form.layerNum" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="人防所在层">
                        <el-input v-model="form.underNum" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="警报器位置">
                        <el-input v-model="form.alarmLocation" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="防护单元数量">
                        <el-input v-model="form.unitNum" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="使用状态">
                        <el-input v-model="form.useYn" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="使用用途">
                        <el-input v-model="form.useTarget" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="使用单位">
                        <el-input v-model="form.useUnit" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="许可截止日期">
                        <el-input v-model="form.useDate" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="使用单位电话">
                        <el-input v-model="form.contactsOphone" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="平时用途">
                        <el-input v-model="form.peaceUse" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="管理单位">
                        <el-input v-model="form.useUnit" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="管理单位电话">
                        <el-input v-model="form.contactsOphone" disabled></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div> -->
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { tableDataList, chakan, } from '@/api/examination/questions'
import { undergroundList } from '@/api/engineering/security/fireControl'

import areaCom from "@/components/area"
import engineering from "@/components/engineering"
export default {
    components: {
        areaCom, engineering
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                county: "",
                underCode: "",
                underName: "",
                underType: "",
                warUse: "",
                useTarget: "",
                peaceUse: "",
                useUnit: "",
            },
            tableData: [],//数据
            total: 0,//分页总数

            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            form: {
                county: '',
                underCode: "",
                content: "",
            },
            rowData: [],
            status: "",
        }
    },
    created () {
        this.getTableDataList();
    },
    methods: {
        search () {
            this.queryInfo.county = this.$refs.areaCom.areaVal
            this.getTableDataList()
        },
        getTableDataList () { // 题库维护列表
            tableDataList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                    this.total = res.total
                }
            })
        },
        gcCheck () {
            if (this.rowData.length != 1){
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            }
            undergroundList(this.rowData[0].underId).then(res => {
            })
            this.dialogFormVisible = true
            // if (this.rowData.length != 1) {
            //     return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            // }
            // chakan(this.rowData[0].underId).then(res => {
            //     this.form = res
            //     this.dialogFormVisible = true
            // })
        },
        closeDialog () {
            this.dialogFormVisible = false
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
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
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
    width: 310px;
}
</style>
