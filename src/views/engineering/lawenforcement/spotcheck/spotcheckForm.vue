<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="12">

            </el-col>
            <el-col :span="12">

            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="saveAndEidt">保 存</el-button>
        </div>
    </div>

</template>

<script>
import { measuresAdd, measuresEdit } from "@/api/engineering/security/controlManagement"

export default {
    props: ["rowData"],
    data () {
        return {
            form: {
                site: "",
                responsible: "",
                phone: "",
                cause: "",
                measures: "",
                dangerType: "",
                arrivalTime: "",
                emerNumber: "",
                dutyUnit: ""
            },
            formRules: {
                responsible: [{ required: true, message: "请填写责任人", trigger: "blur" }],
                phone: [{ required: true, message: "请填写办公电话或手机", trigger: "blur" }],
                site: [{ required: true, message: "请填写地点", trigger: "blur" }],
                cause: [{ required: true, message: "请填写造成险情原因", trigger: "blur" }],
                // dangerType: [{ required: true, message: "请填写办公电话", trigger: "blur" }],
                arrivalTime: [{ required: true, message: "请选择到达现场时间", trigger: "blur" }],
                emerNumber: [{ required: true, message: "请填写抢险人数", trigger: "blur" }],
                dutyUnit: [{ required: true, message: "请填写责任单位", trigger: "blur" }],
                measures: [{ required: true, message: "请填写抢险措施", trigger: "blur" }]
            },
            roleArr: [
                { id: 1, label: '红'},
                { id: 2, label: '橙'},
                { id: 3, label: '黄'},
                { id: 4, label: '蓝'},
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
                this.form.dangerType = parseInt(rowData.dangerType)
                this.form.site = rowData.site
                this.form.responsible = rowData.responsible
                this.form.phone = rowData.phone
                this.form.cause = rowData.cause
                this.form.measures = rowData.measures
                this.form.arrivalTime = rowData.arrivalTime
                this.form.emerNumber = rowData.emerNumber
                this.form.dutyUnit = rowData.dutyUnit
            }
        });
    },
    methods: {
        saveAndEidt () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.rowData != null) {
                        this.form.fmeId = this.formData.fmeId
                        measuresEdit(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.$parent.$parent.dialogFormVisible = false
                                this.$parent.$parent.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        measuresAdd(this.form).then(res => {
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
