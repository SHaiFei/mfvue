<template>
    <div>
        <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="工程编号" prop="underCode">
                        <el-input v-model="form.underCode" @focus="changeCode" @blur="closeCode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="工程名称" prop="underName">
                        <el-input v-model="form.underName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="收费标准" prop="rates">
                        <el-input v-model="form.rates"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="面积" prop="chargeArea">
                        <el-input v-model="form.chargeArea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="收费类型" prop="chargeType">
                        <el-input v-model="form.chargeType"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="saveAndEidt">保 存</el-button>
        </div>

        <div class="underCode" v-show="isUnderCode" ref="isUnderCode">
            <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect' @row-click="clickRow">
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                <el-table-column prop="underCode" label="工程编号" align="center"></el-table-column>
                <el-table-column prop="underName" label="工程名称" align="center"></el-table-column>
                <el-table-column prop="underArea" label="总建筑面积" align="center"></el-table-column>
                <el-table-column prop="useTarget" label="使用用途" align="center"></el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

    </div>

</template>

<script>

import { chargeInformationFormList, chargeInformationAdd, chargeInformationEdit } from '@/api/engineering/system/public'
export default {
    props: ["rowData"],
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
            },
            tableData: [],
            total: 0,
            form: {
                chargeType: "",
                chargeArea: "",
                rates: "",
                underName: "",
                underCode: "",
                underId: ""
            },
            formRules: {
                underCode: [{ required: true, message: "请选择工程编号", trigger: "blur" }],
                rates: [{ required: true, message: "请选择收费标准", trigger: "blur" }],
            },
            formData: this.rowData ? this.rowData[0] : null,
            isUnderCode: false
        }
    },
    created () {
        this.getTableDataList()
    },
    mounted () {
        this.$nextTick(() => {
            if (this.formData != null) {
                let rowData = this.formData
                this.form.chargeType = rowData.chargeType
                this.form.rates = rowData.rates
                this.form.underName = rowData.underName
                this.form.underCode = rowData.underCode
                this.form.chargeArea = rowData.chargeArea
                this.form.underId = rowData.underId

            }
        });
    },
    methods: {
        getTableDataList () { // 题库维护列表
            chargeInformationFormList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        changeCode () {
            this.isUnderCode = true
        },
        closeCode () {
            // this.isUnderCode = false
        },
        saveAndEidt () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.formData != null) {
                        this.form.chargeId = this.formData.chargeId
                        chargeInformationEdit(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.$parent.$parent.dialogFormVisible = false
                                this.$parent.$parent.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        chargeInformationAdd(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.$parent.$parent.dialogFormVisible = false
                                this.$parent.$parent.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    }
                }
            })
        },
        clickRow (row, column, event) { //点击行
            this.$refs.multipleTable.toggleRowSelection(row)
        },
        tableDataSelect (selection) {
            if (selection.length > 1) {
                const del_row = selection.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
            if (selection.length == 1) {
                this.form.underName = selection[0].underName
                this.form.underCode = selection[0].underCode
                this.form.underId = selection[0].underId
                this.form.chargeType = selection[0].useTarget
                this.form.chargeArea = selection[0].fioorArea
                this.form.county = selection[0].county

                this.isUnderCode = false
            }

        },
        close () {
            this.$emit("closeDialog")
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
    },
}
</script>


<style lang='scss' scoped>
.el-select {
    width: 100%;
}
.underCode {
    position: absolute;
    left: 11%;
    top: 90px;
    width: 100%;
    height: 400px;
    overflow-y: auto;
    background-color: #fff;
}
.all-block-pager {
    background-color: #fff;
    margin-bottom: 2rem;
}
</style>
