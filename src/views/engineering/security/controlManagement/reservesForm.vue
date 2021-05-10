<template>
    <div>
        <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="储备单位" prop="storeUnit">
                        <el-input v-model="form.storeUnit"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="储备地点" prop="storeSite">
                        <el-input v-model="form.storeSite"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="负责人" prop="principal">
                        <el-input v-model="form.principal"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="联系电话" prop="phone">
                        <el-input v-model="form.phone"></el-input>
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
import { reservesAdd, reservesEdit } from "@/api/engineering/security/controlManagement"

export default {
    props: ["rowData"],
    data () {
        return {
            form: {
                storeUnit: "",
                storeSite: "",
                principal: "",
                phone: "",
            },
            formRules: {
                storeUnit: [{ required: true, message: "请填写储备单位", trigger: "blur" }],
                principal: [{ required: true, message: "请填写负责人", trigger: "blur" }],
                storeSite: [{ required: true, message: "请填写储备地点", trigger: "blur" }],
                phone: [{ required: true, message: "请填写手机电话", trigger: "blur" }]
            },
            formData: this.rowData ? this.rowData[0] : null
        }
    },
    created () {
    },
    mounted () {
        this.$nextTick(() => {
            if (this.formData != null) {
                let rowData = this.formData
                this.form.storeUnit = rowData.storeUnit
                this.form.storeSite = rowData.storeSite
                this.form.principal = rowData.principal
                this.form.phone = rowData.phone
            }
        });
    },
    methods: {
        saveAndEidt () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.rowData != null) {
                        this.form.msuId = this.formData.msuId
                        reservesEdit(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.$parent.$parent.dialogFormVisible = false
                                this.$parent.$parent.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        reservesAdd(this.form).then(res => {
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
</style>
