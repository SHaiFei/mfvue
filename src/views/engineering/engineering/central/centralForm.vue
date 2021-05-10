<template>
    <div>
        <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="接收单位" prop="receUnit">
                        <el-input v-model="form.receUnit"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="移交单位" prop="tranUnit">
                        <el-input v-model="form.tranUnit"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="移交时间" prop="ydate">
                        <el-date-picker v-model="form.ydate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <!-- <el-form-item label="到达现场时间" prop="arrivalTime">
                        <el-date-picker v-model="form.arrivalTime" value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item> -->
                </el-col>
            </el-row>
            <el-row :gutter="24" v-for="(domain, index) in domains" :key="domain.key">
                <el-col :span="10">
                    <el-form-item label="工程编号">
                        <el-input v-model="domain.underCode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="工程名称">
                        <el-input v-model="domain.underName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" style="margin-top: 5px">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="addDomain">
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="removeDomain(domain)">
                    </el-button>
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
import { centralAdd, centralEdit } from "@/api/engineering/engineering/central"

export default {
    props: ["rowData"],
    data () {
        return {
            form: {
                receUnit: "",
                tranUnit: "",
                ydate: "",
                gcUndergroundTemp: null
            },
            formRules: {
                // responsible: [{ required: true, message: "请填写责任人", trigger: "blur" }],
                // phone: [{ required: true, message: "请填写办公电话或手机", trigger: "blur" }],
                // site: [{ required: true, message: "请填写地点", trigger: "blur" }],
                // cause: [{ required: true, message: "请填写造成险情原因", trigger: "blur" }],
                // arrivalTime: [{ required: true, message: "请选择到达现场时间", trigger: "blur" }],
                // emerNumber: [{ required: true, message: "请填写抢险人数", trigger: "blur" }],
                // dutyUnit: [{ required: true, message: "请填写责任单位", trigger: "blur" }],
                // measures: [{ required: true, message: "请填写抢险措施", trigger: "blur" }]
            },
            formData: this.rowData ? this.rowData[0] : null,
            domains: [{
                underCode: '',
                underName: '',
            }],
        }
    },
    created () {
    },
    mounted () {
        this.$nextTick(() => {
            if (this.formData != null) {
                this.domains = []
                let rowData = this.formData
                console.log(rowData);
                this.form.receUnit = rowData.receUnit
                this.form.tranUnit = rowData.tranUnit
                this.form.ydate = rowData.ydate
                this.form.syncsource = rowData.syncsource

                rowData.tempList.forEach(item => {
                    let params = {}
                    params.underCode = item.underCode
                    params.underName = item.underName
                    params.id = item.id
                    this.domains.push(params)
                })
            }
        });
    },
    methods: {
        addDomain () { // 动态添加
            this.domains.push({
                underCode: '',
                underName: '',
            })
        },
        removeDomain (item) { // 删除
            if (this.domains.length == 1) {
                return this.msgWarning("需保留一项!")
            }
            var index = this.domains.indexOf(item)
            if (index !== -1) {
                this.domains.splice(index, 1)
            }
        },
        saveAndEidt () {
            console.log(this.domains);
            this.form.gcUndergroundTemp = this.domains
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.rowData != null) {
                        this.form.documentAcceId = this.formData.documentAcceId
                        centralEdit(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.$parent.$parent.dialogFormVisible = false
                                this.$parent.$parent.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        centralAdd(this.form).then(res => {
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
    }
}
</script>


<style lang='scss' scoped>
</style>
