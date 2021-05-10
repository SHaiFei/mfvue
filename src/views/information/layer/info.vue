<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>基本信息</el-breadcrumb-item>
            <el-breadcrumb-item>信息管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">信息类别</span>
                    <el-select clearable class="elinput200" v-model="queryInfo.type">
                        <el-option v-for="item in informationType" :key="item.id" :value="item.id" :label="item.label">
                        </el-option>
                    </el-select>
                    <span class="font-12 spanText">所属区</span>
                    <el-select clearable class="elinput200" v-model="queryInfo.area">
                        <el-option v-for="item in informationType" :key="item.id" :value="item.id" :label="item.label">
                        </el-option>
                    </el-select>
                    <span class="font-12 spanText">名称</span>
                    <el-input v-model="queryInfo.address" clearable class="elinput200"></el-input>
                    <div v-if="queryInfo.type == 1 || queryInfo.type == ''" style="display: inline-block">
                        <span class="font-12 spanText">工程编号</span>
                        <el-input v-model="queryInfo.address" clearable class="elinput200"></el-input>
                    </div>
                    <div v-if="queryInfo.type == 4" style="display: inline-block">
                        <span class="font-12 spanText">组件单位</span>
                        <el-input v-model="queryInfo.address" clearable class="elinput200"></el-input>
                        <span class="font-12 spanText">队伍分类</span>
                        <el-input v-model="queryInfo.address" clearable class="elinput200"></el-input>
                    </div>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
                </div>
            </el-row>
            <!-- <sanTable :listLabel="listLabel" :tableData="tableData"></sanTable> -->
            <el-table :data="tableData" style="width: 100%" @selection-change='tableDataSelect'>
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column v-for="(item, index) in listLabel" :key="index" :prop="item.prop" :label="item.label" align="center" :show-overflow-tooltip="true">
                </el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="50%" :close-on-click-modal="false" class="dialogForm">
            <!-- 人防工程 -->
            <pooper v-if="queryInfo.type == 1|| queryInfo.type == ''" />
            <!-- 街乡镇指挥所 -->
            <street v-if="queryInfo.type == 2" />
            <!-- 高点监控 -->
            <monitoring v-if="queryInfo.type == 3" />
            <!-- 救援力量 -->
            <rescue v-if="queryInfo.type == 4" />
            <!-- 应急物资库 -->
            <library v-if="queryInfo.type == 5" />
            <!-- 应急避难场所 -->
            <shelter v-if="queryInfo.type == 6" />
            <!-- 宣教场所 -->
            <mission v-if="queryInfo.type == 7" />
        </el-dialog>
    </div>
</template>

<script>
import sanTable from "@/components/table"
import pooper from "./info/people"
import street from "./info/street"
import monitoring from "./info/monitoring"
import rescue from "./info/rescue"
import library from "./info/library"
import shelter from "./info/shelter"
import mission from "./info/mission"

import { tableList } from '@/api/examination/engineering'

export default {
    components: {
        sanTable, pooper, street, monitoring, rescue, library, shelter, mission
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                type: ""
            },
            informationType: [
                { label: "人防工程", id: 1 },
                { label: "街乡镇指挥所", id: 2 },
                { label: "高点监控", id: 3 },
                { label: "救援力量", id: 4 },
                { label: "应急物资库", id: 5 },
                { label: "应急避难场所", id: 6 },
                { label: "宣教场所", id: 7 }
            ],
            tableData: [
                {
                    name: '23',
                    carRewardId: '34',
                    carFundProvider: '34',
                    carFrameNo: '354',
                    carNo: '534',
                    acreage: '93450',
                    assetsType: '44344',
                    incomePrice: '34',
                },
                {
                    name: '343',
                    carRewardId: '78',
                    carFundProvider: '34',
                    carFrameNo: '78',
                    carNo: '78',
                    acreage: '756',
                    assetsType: '354',
                    incomePrice: '34534',
                }
            ],//数据
            listLabel: [
                { label: '名称', prop: 'name' },
                { label: '值', width: '', prop: 'carRewardId' },
                { label: '价格', prop: 'carFundProvider' },
                { label: '利润', prop: 'carFrameNo' },
                { label: '大类', prop: 'carNo' },
                { label: '小类', prop: 'acreage' },
                { label: '有价格', prop: 'assetsType' },
                { label: '极好价格', prop: 'incomePrice' },
            ], // 表头数据
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogVisible: false,//增加弹窗
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
            let url = ""
            if (this.queryInfo.type == "1") {
                url = "../../../../js/info.json"
                this.getJson(url)
            } else if (this.queryInfo.type == "2") {
                url = "../../../../js/info2.json"
                this.getJson(url)
            }
        },
        getJson (url) { // 获取json 文件
            this.axios.get(url).then(res => {
                this.tableData = res.data.data
                this.listLabel = res.data.label
            })
        },
        getTableDataList () { // 数据列表
            tableList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            })
            // questionList(this.queryInfo).then(res => {
            //     if (res.code == 200) {
            //         this.tableData = res.rows;
            //         this.total = res.total; //总页数
            //     } else {
            //         this.msgError(res.msg)
            //     }
            // });
        },
        add () { // 添加
            let type = this.queryInfo.type
            switch (type) {
                case 1: case "":
                    this.title = "添加人防工程信息"
                    break
                case 2:
                    this.title = "添加街道指挥所信息"
                    break
                case 3:
                    this.title = "添加高点监控管理信息"
                    break
                case 4:
                    this.title = "添加救援力量信息"
                    break
                case 5:
                    this.title = "添加应急物资库信息"
                    break
                case 6:
                    this.title = "添加应急避难所信息"
                    break
                case 7:
                    this.title = "添加宣教场所信息"
                    break
            }
            this.dialogVisible = true
        },
        edit () { //  修改
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            }
            this.dialogVisible = true
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
                        this.msgSuccess("删除成功")
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
        }

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
