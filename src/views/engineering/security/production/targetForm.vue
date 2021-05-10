<template>
    <div>
        <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="所属区" prop="county">
                        <areaCom ref="areaCom"></areaCom>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="责任书名称" prop="dutyName">
                        <el-input v-model="form.dutyName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="上级主管部门" prop="upstream">
                        <el-input v-model="form.upstream"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="签字人" prop="signatory">
                        <el-input v-model="form.signatory"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="签字日期" prop="signatureDate">
                        <el-date-picker v-model="form.signatureDate" value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-form-item label="内容摘要" prop="synopsis">
                        <el-input v-model="form.synopsis" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-upload ref="upload" class="upload" :action="action" :file-list="fileList" :on-success="fileUploadSuccess" :on-change="handleChange" :limit="1">
                        <el-button type="primary" size="small">
                            点击上传
                        </el-button>
                    </el-upload>
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

import { targetAdd, targetEdit } from "@/api/engineering/security/production"
import areaCom from '@/components/area'
export default {
    components: {
        areaCom
    },
    props: ["rowData"],
    data () {
        return {
            action: this.GLOBAL.FILE_UPLOAD_URL + "/common/upload",
            fileList: [],
            fileUrl: "", // 文件路径
            fname: "", // 文件名称
            form: {
                county: "",
                dutyName: "",
                synopsis: "",
                upstream: "",
                signatory: "",
                signatureDate: "",
            },
            formRules: {
                dutyName: [{ required: true, message: "请填写责任书名称", trigger: "blur" }],
                synopsis: [{ required: true, message: "请填写内容摘要", trigger: "blur" }],
                upstream: [{ required: true, message: "请填写上级主管部门", trigger: "blur" }],
                signatory: [{ required: true, message: "请填写签订人", trigger: "blur" }],
                signatureDate: [{ required: true, message: "请选择签订日期", trigger: "blur" }]
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
                this.$refs.areaCom.areaVal = rowData.county
                this.form.dutyName = rowData.dutyName
                this.form.synopsis = rowData.synopsis
                this.form.upstream = rowData.upstream
                this.form.signatory = rowData.signatory
                this.form.signatureDate = rowData.signatureDate

                // console.log(rowData);
                // let obj = {
                //     name: rowData.fileName,
                //     fileId: rowData.fileId
                // }
                // this.fileList.push(obj)
            }
        })
    },
    methods: {
        handleChange (file, fileList) {
            this.fileList = fileList.slice(-3);
        },
        removeFile (file) {
            this.fileList.splice(this.fileList.findIndex(item => file.uid == item.uid), 1)
        },
        fileUploadSuccess (file) { // 上传文件成功后的回调
            if (file.code == 200) {
                this.fileUrl = file.fileName
                this.fname = file.f
                this.msgSuccess(file.msg)
                this.uploadNo = false // 成功后保存按钮可以点击
            } else {
                this.msgError(file.msg)
            }
        },
        saveAndEidt () {
            this.form.file = this.fileUrl
            this.form.name = this.fname
            this.form.county = this.$refs.areaCom.areaVal
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.rowData != null) {
                        this.form.goaId = this.formData.goaId
                        targetEdit(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.$parent.$parent.dialogFormVisible = false
                                this.$parent.$parent.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        targetAdd(this.form).then(res => {
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
            this.$emit("closeDialogFormVisible")
        }
    },
}
</script>


<style lang='scss' scoped>
</style>
