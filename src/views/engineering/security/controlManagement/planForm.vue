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
                    <el-form-item label="预案名称" prop="planName">
                        <el-input v-model="form.planName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                 <el-col :span="12">
                    <el-form-item label="创建时间" prop="createTime">
                        <el-date-picker v-model="form.createTime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="创建人" prop="creator">
                        <el-input v-model="form.creator"></el-input>
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
import { planAdd, planEdit } from "@/api/engineering/security/controlManagement"

import areaCom from "@/components/area"
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
                planName: "",
                createTime: "",
                creator: "",
            },
            formRules: {
                // planName: [{ required: true, message: "请填写责任人", trigger: "blur" }],
                // createTime: [{ required: true, message: "请填写地点", trigger: "blur" }],
                // creator: [{ required: true, message: "请填写抢险措施", trigger: "blur" }]
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
                this.form.planName = rowData.planName
                this.form.createTime = rowData.createTime
                this.form.creator = rowData.creator
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
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.form.county = this.$refs.areaCom.areaVal
                    if (this.rowData != null) {
                        this.form.fplId = this.formData.fplId
                        planEdit(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.$parent.$parent.dialogFormVisible = false
                                this.$parent.$parent.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        planAdd(this.form).then(res => {
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
