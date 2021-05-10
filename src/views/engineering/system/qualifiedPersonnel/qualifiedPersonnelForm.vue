<template>
    <div>
        <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="form.sex">
                            <el-option v-for="item in sexArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="职务" prop="duty">
                        <el-input v-model="form.duty"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="固定电话" prop="telephone">
                        <el-input v-model="form.telephone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="执法证号" prop="zfzh">
                        <el-input v-model="form.zfzh"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="saveAndEidt">保 存</el-button>
        </div>
    </div>

</template>

<script>

import { quapersonAdd, quapersonEdit } from '@/api/engineering/system/public'
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
                duty: "",
                name: "",
                sex: "M",
                phone: "",
                zfzh: "",
                telephone: ""
            },
            formRules: {
                duty: [{ required: true, message: "请填写职务", trigger: "blur" }],
                name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
                phone: [{ required: true, message: "请填写手机号", trigger: "blur" }],
                zfzh: [{ required: true, message: "请填写执法证号", trigger: "blur" }],
                telephone: [{ required: true, message: "请填写固定电话", trigger: "blur" }],
                sex: [{ required: true, message: "请选择性别", trigger: "blur" }]
            },
            sexArr: [
                { label: '男', id: 'M' },
                { label: '女', id: 'F' },
            ],
            formData: this.rowData ? this.rowData[0] : null,
        }
    },
    created () {
    },
    mounted () {
        this.$nextTick(() => {
            if (this.formData != null) {
                let rowData = this.formData
                this.form.duty = rowData.duty
                this.form.name = rowData.name
                this.form.sex = rowData.sex
                this.form.phone = rowData.phone
                this.form.zfzh = rowData.zfzh
                this.form.telephone = rowData.telephone

            }   
        });
    },
    methods: {
        saveAndEidt () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.formData != null) {
                        this.form.id = this.formData.id
                        quapersonEdit(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.$parent.$parent.dialogFormVisible = false
                                this.$parent.$parent.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        quapersonAdd(this.form).then(res => {
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
