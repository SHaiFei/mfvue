<template>
    <div>
        <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="队伍性质" prop="nature">
                        <el-select v-model="form.nature">
                            <el-option v-for="item in natureArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="单位名称" prop="affiliation">
                        <el-input v-model="form.affiliation"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="抢险队伍名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="队伍人数" prop="population">
                        <el-input v-model="form.population"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="队伍负责人" prop="principal">
                        <el-input v-model="form.principal"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系方式" prop="handset">
                        <el-input v-model="form.handset"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="单位负责人" prop="unitPrincipal">
                        <el-input v-model="form.unitPrincipal"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="单位负责人职务" prop="dutys">
                        <el-input v-model="form.dutys"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="单位负责人联系方式" prop="phone">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="队伍职责" prop="obligation">
                        <el-input v-model="form.obligation"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="队伍分布位置" prop="teamSite">
                        <el-input v-model="form.teamSite"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-form-item label="抢险设备" prop="facility">
                        <el-input v-model="form.facility" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- <el-row :gutter="24">
                <el-col :span="24">
                    <el-form-item label="备注" prop="handset">
                        <el-input v-model="form.handset" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="saveAndEidt">保 存</el-button>
        </div>
    </div>

</template>

<script>
import { rescueTeamAdd, rescueTeamEdit } from "@/api/engineering/security/controlManagement"

export default {
    props: ["rowData"],
    data () {
        return {
            form: {
                nature: "",
                affiliation: "",
                name: "",
                population: "",
                handset: "",
                principal: "",
                unitPrincipal: "",
                dutys: "",
                obligation: "",
                phone: "",
                teamSite: "",
                facility: "",
            },
            formRules: {
                affiliation: [{ required: true, message: "请填写单位名称", trigger: "blur" }],
                name: [{ required: true, message: "请填写抢险队伍名称", trigger: "blur" }],
                population: [{ required: true, message: "请填写队伍人数", trigger: "blur" }],
                handset: [{ required: true, message: "请填写联系方式", trigger: "blur" }],
                principal: [{ required: true, message: "请填写队伍负责人", trigger: "blur" }],
                unitPrincipal: [{ required: true, message: "请填写单负责人", trigger: "blur" }],
                dutys: [{ required: true, message: "请填写单位负责人职务", trigger: "blur" }],
                obligation: [{ required: true, message: "请填写队伍职责", trigger: "blur" }],
                phone: [{ required: true, message: "请填写单位负责人联系方式", trigger: "blur" }],
                teamSite: [{ required: true, message: "请填写队伍分布位置", trigger: "blur" }],
                facility: [{ required: true, message: "请填写抢险设备", trigger: "blur" }]
            },
            natureArr: [
                { id: 1, label: '专业抢险队伍'},
                { id: 2, label: '驻地部队抢险队伍'},
                { id: 3, label: '其他抢险队伍'}
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
                this.form.nature = parseInt(rowData.nature)
                this.form.affiliation = rowData.affiliation
                this.form.dutys = rowData.dutys
                this.form.name = rowData.name
                this.form.handset = rowData.handset
                this.form.population = rowData.population
                this.form.principal = rowData.principal
                this.form.unitPrincipal = rowData.unitPrincipal
                this.form.obligation = rowData.obligation
                this.form.phone = rowData.phone
                this.form.teamSite = rowData.teamSite
                this.form.facility = rowData.facility
            }
        });
    },
    methods: {
        saveAndEidt () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.rowData != null) {
                        this.form.mteId = this.formData.mteId
                        rescueTeamEdit(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.$parent.$parent.dialogFormVisible = false
                                this.$parent.$parent.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        rescueTeamAdd(this.form).then(res => {
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
