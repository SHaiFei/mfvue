<template>
    <div>
        <el-table :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
            <el-table-column prop="county" label="所属区" align="center"></el-table-column>
            <el-table-column prop="ADDRESS" label="工程编号" align="center"></el-table-column>
            <el-table-column prop="ADDRESS" label="街道" align="center"></el-table-column>
            <el-table-column prop="ADDRESS" label="工程名称" align="center"></el-table-column>
            <el-table-column prop="ADDRESS" label="工程类别" align="center"></el-table-column>
            <el-table-column prop="ADDRESS" label="战时用途" align="center"></el-table-column>
            <el-table-column prop="ADDRESS" label="使用用途" align="center"></el-table-column>
            <el-table-column prop="ADDRESS" label="平时用途" align="center"></el-table-column>
            <el-table-column prop="ADDRESS" label="使用单位" align="center"></el-table-column>
        </el-table>
        <div class="all-block-pager">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
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
import { basementList } from '@/api/engineering/system/public'
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
