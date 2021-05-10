<template>
    <div>
        <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="所属单位" prop="orgId">
                        <treeselect ref="headerChild" style="width: 100%;margin-top: -40px" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="供应商名称" prop="supplierName">
                        <el-input v-model="form.supplierName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="联系人" prop="contacts">
                        <el-input v-model="form.contacts"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系人电话" prop="telphone">
                        <el-input v-model="form.telphone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="邮箱" prop="emails">
                        <el-input v-model="form.emails"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="单位负责人" prop="leadName">
                        <el-input v-model="form.leadName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="负责人电话" prop="leadPhone">
                        <el-input v-model="form.leadPhone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-form-item label="主营业务" prop="business"> 
                        <el-input v-model="form.business" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="form.remark" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="saveAndEdit">保 存</el-button>
        </div>
    </div>
</template>


<script>
import { supplierAdd, supplierEdit } from "@/api/supplies/system/supplier"

import treeselect from "@/components/treeselect";
export default {
    components: {
        treeselect
    },
    props: ['rowData'],
    data () {
        return {
            form: {
                supplierName: "",
                contacts: "",
                telphone: "",
                emails: "",
                leadName: "",
                leadPhone: "",
                remark: "",
                business: "",
            },
            formRules: {},
            formData: this.rowData ? this.rowData[0] : null,
        }
    },
    created () {

    },
    mounted () {
        this.$nextTick(() => {
            if (this.formData != null) {
                let rowData = this.formData
                this.form.supplierName = rowData.supplierName
                this.form.contacts = rowData.contacts
                this.form.telphone = rowData.telphone
                this.form.emails = rowData.emails
                this.form.leadName = rowData.leadName
                this.form.leadPhone = rowData.leadPhone
                this.form.remark = rowData.remark
                this.form.business = rowData.business
                this.$refs.headerChild.department = rowData.orgId
            }
        });
    },
    methods: {
        saveAndEdit () {
            this.form.orgid = this.$refs.headerChild.department
            if (this.rowData != null) {
                this.form.id = this.formData.id
                supplierEdit(this.form).then(res => {
                    if (res.code == 200) {
                        this.msgSuccess(res.msg)
                        this.$parent.$parent.dialogFormVisible = false
                        this.$parent.$parent.getTableDataList()
                    } else {
                        this.msgError(res.msg)
                    }
                })
            } else {
                supplierAdd(this.form).then(res => {
                    if (res.code == 200) {
                        this.msgSuccess(res.msg)
                        this.$parent.$parent.dialogFormVisible = false
                        this.$parent.$parent.getTableDataList()
                    } else {
                        this.msgError(res.msg)
                    }
                })
            }
        },
        close () {
            this.$parent.$parent.dialogFormVisible = false
            // this.$emit("closeDialogFormVisible")
        }
    },
}
</script>


<style lang='scss' scoped>
</style>
