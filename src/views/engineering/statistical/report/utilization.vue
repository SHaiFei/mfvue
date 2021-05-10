<template>
    <div>
        <el-row class="elRow">
            <div class="elRowLeft">
                <span class="font-12 spanText">所属区</span>
                <areaCom ref="areaCom" class="elinput200"></areaCom>
                <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
            </div>
        </el-row>
        <el-table :data="tableData" stripe style="width:100%;margin-top: 10px">
            <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
            <el-table-column prop="county" label="区域" align="center"></el-table-column>
            <el-table-column prop="usingGarageArea" label="在用汽车库面积" align="center"></el-table-column>
            <el-table-column prop="garageArea" label="总汽车库面积" align="center"></el-table-column>
            <el-table-column prop="areaUtilization" label="按面积利用率%" align="center"></el-table-column>
            <el-table-column prop="usingParkingNum" label="在用车位数" align="center"></el-table-column>
            <el-table-column prop="parkingNum" label="已建车位数" align="center"></el-table-column>
            <el-table-column prop="parkUtilization" label="按车位数利用率%" align="center"></el-table-column>
        </el-table>
        <div class="all-block-pager">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { utilizationList } from '@/api/engineering/system/public'

import areaCom from '@/components/area'
export default {
    components: {
        areaCom
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
            },
            tableData: [],//数据
            total: 0,//分页总数
            rowData: [],
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            utilizationList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        search () {
            this.queryInfo.county = this.$refs.areaCom.areaVal
            this.queryInfo.pageNum = 1
            this.getTableDataList()
        },
        add () { // 添加
            this.status = "add"
            this.title = "新增"
            this.form = {
                name: "",
                unit: "",
            }
            this.dialogFormVisible = true
        },
        edit () { //  修改
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.status = "edit"
                this.title = "修改"
                this.form = {
                    name: this.rowData[0].name,
                    unit: this.rowData[0].unit
                }
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
