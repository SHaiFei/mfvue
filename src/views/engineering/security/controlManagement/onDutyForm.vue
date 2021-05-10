<template>
    <div>
        <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="防汛角色" prop="fRole">
                        <el-select v-model="form.fRole">
                            <el-option v-for="item in roleArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="monicker">
                        <el-input v-model="form.monicker"></el-input>
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
                    <el-form-item label="办公电话" prop="offPhone">
                        <el-input v-model="form.offPhone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="手机电话" prop="handset">
                        <el-input v-model="form.handset"></el-input>
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
import { onDutyAdd, onDutyEdit } from "@/api/engineering/security/controlManagement"

export default {
    props: ["rowData"],
    data () {
        return {
            form: {
                fRole: "",
                monicker: "",
                duty: "",
                offPhone: "",
                handset: "",
            },
            formRules: {
                monicker: [{ required: true, message: "请填写姓名", trigger: "blur" }],
                duty: [{ required: true, message: "请填写职务", trigger: "blur" }],
                offPhone: [{ required: true, message: "请填写办公电话", trigger: "blur" }],
                handset: [{ required: true, message: "请填写手机电话", trigger: "blur" }]
            },
            roleArr: [
                { id: 1, label: '指挥'},
                { id: 2, label: '常副指挥'},
                { id: 3, label: '副指挥'},
                { id: 4, label: '成员'},
                { id: 5, label: '办公室主任'},
                { id: 6, label: '副主任'},
                { id: 7, label: '联系人'},
            ],
            formData: this.rowData ? this.rowData[0] : null
        }
    },
    created () {
    },
    mounted () {
        this.$nextTick(() => {
            if (this.formData != null) {
                let rowData = this.formData
                this.form.fRole = parseInt(rowData.fRole)
                this.form.monicker = rowData.monicker
                this.form.duty = rowData.duty
                this.form.offPhone = rowData.offPhone
                this.form.handset = rowData.handset
            }
        });
    },
    methods: {
        saveAndEidt () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.rowData != null) {
                        this.form.fstId = this.formData.fstId
                        onDutyEdit(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.$parent.$parent.dialogFormVisible = false
                                this.$parent.$parent.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        onDutyAdd(this.form).then(res => {
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
.el-date-editor--date {
    width: 100% !important;
}
.dialog-footer {
    text-align: right;
    margin-top: 15px;
}
</style>
