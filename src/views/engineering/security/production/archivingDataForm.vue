<template>
    <div>
        <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="所属区" prop="county">
                        <!-- <el-input v-model="form.county"></el-input> -->
                        <areaCom ref="areaCom"></areaCom>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="资料名称" prop="dataName">
                        <el-input v-model="form.dataName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <!-- <el-col :span="12">
                    <el-form-item label="资料类型" prop="upstream">
                        <el-input v-model="form.upstream"></el-input>
                    </el-form-item>
                </el-col> -->
                <el-col :span="12">
                    <el-form-item label="存档人" prop="noter">
                        <el-input v-model="form.noter"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="归档日期" prop="archiveDate">
                        <el-date-picker v-model="form.archiveDate" value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
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

import { archivingAdd, archivingEdit } from "@/api/engineering/security/production"

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
                dataName: "",
                // upstream: "",
                noter: "",
                archiveDate: "",
            },
            formRules: {
                dataName: [{ required: true, message: "请填写责任书名称", trigger: "blur" }],
                noter: [{ required: true, message: "请填写存档人", trigger: "blur" }],
                archiveDate: [{ required: true, message: "请选择归档日期", trigger: "blur" }]
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
                this.form.dataName = rowData.dataName
                this.form.upstream = rowData.upstream
                this.form.noter = rowData.noter
                this.form.archiveDate = rowData.archiveDate
            }
        });
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
                        this.form.datId = this.formData.datId
                        archivingEdit(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.$parent.$parent.dialogFormVisible = false
                                this.$parent.$parent.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        archivingAdd(this.form).then(res => {
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
.el-date-editor--date {
    width: 100% !important;
}
.dialog-footer {
    text-align: right;
    margin-top: 15px;
}
</style>
