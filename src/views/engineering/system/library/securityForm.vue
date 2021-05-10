<template>
    <div>
        <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="检查依据" prop="spotBasis">
                        <spotBasis ref="spotBasis" />
                        <!-- <el-select v-model="form.spotBasis">
                            <el-option v-for="item in spotBasisArr" :key="item.id" :value="item.id" :label="item.label"></el-option>
                        </el-select> -->
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="责任部门" prop="department">
                        <resDepartment ref="department"></resDepartment>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="处理方案" prop="dispose">
                        <el-select v-model="form.dispose">
                            <el-option v-for="item in planArr" :key="item.id" :value="item.id" :label="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-form-item label="检查内容" prop="content">
                        <el-input v-model="form.content" type="textarea"></el-input>
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

import { securityAdd, securityEdit } from '@/api/engineering/system/library'

import resDepartment from "@/components/resDepartment"
import spotBasis from "@/components/spotBasis"

export default {
    components: {
        resDepartment, spotBasis
    },
    props: ["rowData"],
    data () {
        return {
            form: {
                spotBasis: "",
                dispose: "",
                content: "",
                category: 1
            },
            formRules: {
                // tranUnit: [{ required: true, message: "请填写存档人", trigger: "blur" }],
            },
            formData: this.rowData ? this.rowData[0] : null,
            planArr: [
                { id: 1, label: '停止使用' },
                { id: 2, label: '停业整顿' },
                { id: 3, label: '限期整改' }
            ],
        }
    },
    created () {
    },
    mounted () {
        this.$nextTick(() => {
            console.log(this.formData);
            if (this.formData != null) {
                let rowData = this.formData
                this.form.content = rowData.content
                if (rowData.dispose != null) {
                    this.form.dispose = parseInt(rowData.dispose)
                }
                if (rowData.department != null) {
                    this.$refs.department.departmentVal = parseInt(rowData.department)
                }
                // if (rowData.spotBasi != null) {
                    this.$refs.spotBasis.spotBasisVal = parseInt(rowData.spotBasis)
                // }
            }
        });
    },
    methods: {
        saveAndEidt () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.form.department = this.$refs.department.departmentVal
                    this.form.spotBasis = this.$refs.spotBasis.spotBasisVal
                    if (this.rowData != null) {
                        this.form.ckiId = this.formData.ckiId
                        securityEdit(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.$parent.$parent.dialogFormVisible = false
                                this.$parent.$parent.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        securityAdd(this.form).then(res => {
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
        close () {
            this.$emit("closeDialog")
        }
    },
}
</script>


<style lang='scss' scoped>
.el-select {
    width: 100%;
}
</style>
