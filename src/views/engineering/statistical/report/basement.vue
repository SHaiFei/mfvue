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
            <!-- <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column> -->
            <el-table-column prop="county" label="类别" align="center" width="100"></el-table-column>
            <el-table-column prop="" label="工程数量面积总量" align="center">
                <el-table-column prop="" label="工程处数(处)" align="center">
                    <el-table-column prop="hjNum" label="合计" align="center"></el-table-column>
                    <el-table-column prop="dwNum" label="单位" align="center"></el-table-column>
                    <el-table-column prop="ggNum" label="公共" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="" label="工程面积(平方米)" align="center">
                    <el-table-column prop="hjArea" label="合计" align="center"></el-table-column>
                    <el-table-column prop="dwArea" label="单位" align="center"></el-table-column>
                    <el-table-column prop="ggArea" label="公共" align="center"></el-table-column>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="人掩" align="center">
                <el-table-column prop="" label="工程处数(处)" align="center">
                    <el-table-column prop="hjRyNum" label="合计" align="center"></el-table-column>
                    <el-table-column prop="dwRyNum" label="单位" align="center"></el-table-column>
                    <el-table-column prop="ggRyNum" label="公共" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="" label="工程面积(平方米)" align="center">
                    <el-table-column prop="hjRyArea" label="合计" align="center"></el-table-column>
                    <el-table-column prop="dwRyArea" label="单位" align="center"></el-table-column>
                    <el-table-column prop="ggRyArea" label="公共" align="center"></el-table-column>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="专业队" align="center">
                <el-table-column prop="" label="工程处数(处)" align="center">
                    <el-table-column prop="hjZydNum" label="合计" align="center"></el-table-column>
                    <el-table-column prop="dwZydNum" label="单位" align="center"></el-table-column>
                    <el-table-column prop="ggZydNum" label="公共" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="" label="工程面积(平方米)" align="center">
                    <el-table-column prop="hjZydArea" label="合计" align="center"></el-table-column>
                    <el-table-column prop="dwZydArea" label="单位" align="center"></el-table-column>
                    <el-table-column prop="ggZydArea" label="公共" align="center"></el-table-column>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="医疗救护" align="center">
                <el-table-column prop="" label="工程处数(处)" align="center">
                    <el-table-column prop="hjYlNum" label="合计" align="center"></el-table-column>
                    <el-table-column prop="dwYlNum" label="单位" align="center"></el-table-column>
                    <el-table-column prop="ggYlNum" label="公共" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="" label="工程面积(平方米)" align="center">
                    <el-table-column prop="hjYlArea" label="合计" align="center"></el-table-column>
                    <el-table-column prop="dwYlArea" label="单位" align="center"></el-table-column>
                    <el-table-column prop="ggYlArea" label="公共" align="center"></el-table-column>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="物资库" align="center">
                <el-table-column prop="" label="工程处数(处)" align="center">
                    <el-table-column prop="hjWzNum" label="合计" align="center"></el-table-column>
                    <el-table-column prop="dwWzNum" label="单位" align="center"></el-table-column>
                    <el-table-column prop="ggWzNum" label="公共" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="" label="工程面积(平方米)" align="center">
                    <el-table-column prop="hjWzArea" label="合计" align="center"></el-table-column>
                    <el-table-column prop="dwWzArea" label="单位" align="center"></el-table-column>
                    <el-table-column prop="ggWzArea" label="公共" align="center"></el-table-column>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="指挥工程" align="center">
                <el-table-column prop="" label="工程处数(处)" align="center">
                    <el-table-column prop="hjZhNum" label="合计" align="center"></el-table-column>
                    <el-table-column prop="dwZhNum" label="单位" align="center"></el-table-column>
                    <el-table-column prop="ggZhNum" label="公共" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="" label="工程面积(平方米)" align="center">
                    <el-table-column prop="hjZhArea" label="合计" align="center"></el-table-column>
                    <el-table-column prop="dwZhArea" label="单位" align="center"></el-table-column>
                    <el-table-column prop="ggZhArea" label="公共" align="center"></el-table-column>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="其他工程" align="center">
                <el-table-column prop="" label="工程处数(处)" align="center">
                    <el-table-column prop="hjQtNum" label="合计" align="center"></el-table-column>
                    <el-table-column prop="dwQtNum" label="单位" align="center"></el-table-column>
                    <el-table-column prop="ggQtNum" label="公共" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="" label="工程面积(平方米)" align="center">
                    <el-table-column prop="hjQtArea" label="合计" align="center"></el-table-column>
                    <el-table-column prop="dwQtArea" label="单位" align="center"></el-table-column>
                    <el-table-column prop="ggQtArea" label="公共" align="center"></el-table-column>
                </el-table-column>
            </el-table-column>
        </el-table>
        <div class="all-block-pager">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { basementList } from '@/api/engineering/system/public'

import areaCom from "@/components/area"
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
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            basementList(this.queryInfo).then(res => {
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
