<template>
    <div>
        <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="检查依据" prop="spotBasis">
                        <spotBasis ref="spotBasis" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属范围" prop="scope">
                        <el-select v-model="form.scope" placeholder="请选择">
                            <el-option v-for='(item,index) in scopeArr' :key='item.id' :label="item.label" :value="item.id">
                            </el-option>
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

import spotBasis from "@/components/spotBasis"

export default {
    components: {
        spotBasis
    },
    props: ["rowData"],
    data () {
        return {
            form: {
                spotBasis: "",
                scope: "",
                content: "",
                category: 2
            },
            formRules: {
                content: [{ required: true, message: "请填写检查内容", trigger: "blur" }],
            },
            formData: this.rowData ? this.rowData[0] : null,
            scopeArr: [
                { id: 1, label: '维护管理工作' },
                { id: 2, label: '早期工程' }
            ]
        }
    },
    created () {
    },
    mounted () {
        this.$nextTick(() => {
            if (this.formData != null) {
                let rowData = this.formData
                this.form.content = rowData.content
                if (rowData.scope != null) {
                    this.form.scope = parseInt(rowData.scope)
                }
                if (rowData.spotBasi != null) {
                    this.$refs.spotBasis.spotBasisVal = parseInt(rowData.spotBasis)
                }
            }
        });
    },
    methods: {
        saveAndEidt () {
            this.$refs.form.validate(valid => {
                if (valid) {
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
