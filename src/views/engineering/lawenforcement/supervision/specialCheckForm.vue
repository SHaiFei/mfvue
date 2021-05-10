<template>
    <div>
        <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="任务名称" prop="taskName">
                        <el-input v-model="form.taskName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="任务期限" prop="deadline">
                        <el-date-picker v-model="form.deadline" value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-form-item label="任务说明" prop="taskExplain">
                        <el-input v-model="form.taskExplain" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-form-item label="工程清单" prop="content">
                        <el-input v-model="form.content" type="textarea" @focus="changeCode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-form-item label="检查事项关联" prop="syncsource">
                        <el-input v-model="form.syncsource" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-upload ref="upload" class="upload" :action="action" :file-list="fileList" :on-success="fileUploadSuccess" :on-change="handleChange" :on-remove="removeFile" :limit="1">
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
        <div v-show="isUnderCode" class="underCode">
            <div class="elRowLeft">
                <span class="font-12 spanText">接收单位</span>
                <el-input v-model="queryInfo.receUnit" clearable class="elinput200"></el-input>
                <span class="font-12 spanText">工程名称</span>
                <el-input v-model="queryInfo.underName" clearable class="elinput200"></el-input>
                <el-button type="primary" size="small" icon="el-icon-search" @click="search" style="margin-left: 10px">查询</el-button>
                <el-button icon="el-icon-close" class="close" @click="closeCode"></el-button>
            </div>
            <div ref="isUnderCode">
                <el-table ref="multipleTable" :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
                    <el-table-column type="selection" width="50" align="center"></el-table-column>
                    <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                    <el-table-column prop="underCode" label="工程编号" align="center"></el-table-column>
                    <el-table-column prop="county" label="所属区" align="center"></el-table-column>
                    <el-table-column prop="underName" label="工程名称" align="center"></el-table-column>
                </el-table>
                <div class="all-block-pager">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { centralOrganAddList } from "@/api/engineering/security/centralOrgan"

import { specialCheckInfo, specialCheckEdit, specialCheckAdd, specialCheckFileDel } from '@/api/engineering/supervision/securityCheck'

export default {
    props: ["rowData"],
    data () {
        return {
            action: this.GLOBAL.FILE_UPLOAD_URL + "/common/upload",
            fileList: [],
            fileUrl: "", // 文件路径
            fname: "", // 文件名称
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                underName: "",
                receUnit: ""
            },
            tableData: [],
            total: 0,
            form: {
                taskName: "",
                deadline: "",
                taskExplain: "",
                syncsource: "",
            },
            formRules: {
                // content: [{ required: true, message: "请填写检查内容", trigger: "blur" }],
            },
            formData: this.rowData ? this.rowData[0] : null,
            isUnderCode: false,
            specialCheckArr: [],
            gcSpecialUnders: [],
            tempList: [],
            labelData: []
        }
    },
    created () {
        if (this.formData != null) {
            this.getSpecialCheckInfo()
        }
    },
    mounted () {
        setTimeout(() => {
            this.$nextTick(() => {
                if (this.formData != null) {
                    let rowData = this.formData
                    this.form.content = ""
                    this.form.taskName = rowData.taskName
                    this.form.deadline = rowData.deadline
                    this.form.taskExplain = rowData.taskExplain
                    this.form.syncsource = rowData.syncsource

                    this.tempList.forEach(item => {
                        let params = {}
                        params.underCode = item.underCode
                        params.underName = item.underName
                        let underIdObj = {}
                        underIdObj.underId = item.underId
                        this.gcSpecialUnders.push(underIdObj)
                        this.form.content += `编号: ${item.underCode} ----  名称: ${item.underName} \n`
                    })
                    if (rowData.name != null) {
                        let obj = {
                            name: rowData.name,
                            fileId: rowData.fileId
                        }
                        this.fileList.push(obj)
                    }
                }
            });
        }, 200)
    },
    methods: {
        getTableDataList () {
            centralOrganAddList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        getSpecialCheckInfo () {
            specialCheckInfo(this.formData.sckId).then(res => {
                if (res.code == 200) {
                    this.tempList = res.rows
                }
            })
        },
        handleChange (file, fileList) {
            this.fileList = fileList.slice(-3);
        },
        removeFile (file) {
            specialCheckFileDel(file.fileId).then(res => {})
            // this.fileList.splice(this.fileList.findIndex(item => file.uid == item.uid), 1)
        },
        fileUploadSuccess (file) { // 上传文件成功后的回调
            if (file.code == 200) {
                this.fileUrl = file.fileName
                this.fname = file.f
                this.msgSuccess(file.msg)
            } else {
                this.msgError(file.msg)
            }
        },
        search () { // 查询
            this.queryInfo.pageNum = 1
            this.getTableDataList()
        },
        changeCode () { // 请求表格数据
            this.gcSpecialUnders = []
            this.specialCheckArr = []
            this.form.gcSpecialUnders = []
            this.form.content = ""
            this.isUnderCode = true
            this.getTableDataList()
        },
        closeCode () { // 关闭表格 处理数据
            let specialCheckArr = this.specialCheckArr
            specialCheckArr.forEach(item => {
                let params = {}
                params.underId = item.underId
                this.gcSpecialUnders.push(params)
                this.form.content += `编号: ${item.underCode} ----  名称: ${item.underName} \n`
            })
            this.isUnderCode = false
        },
        tableDataSelect (val) {  //复选框改变
            this.specialCheckArr = val
        },
        saveAndEidt () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.form.file = this.fileUrl
                    this.form.name = this.fname
                    this.form.gcSpecialUnders = this.gcSpecialUnders
                    if (this.rowData != null) {
                        this.form.sckId = this.formData.sckId
                        specialCheckEdit(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.$parent.$parent.dialogFormVisible = false
                                this.$parent.$parent.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        specialCheckAdd(this.form).then(res => {
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
        },
        handleCurrentChange (newPage) {  //分页当前页
            this.queryInfo.pageNum = newPage
            this.getTableDataList()
        },
        handleSizeChange (newSize) {   //分页每页显示条数
            this.queryInfo.pageSize = newSize
            this.getTableDataList()
        },
    },
}
</script>


<style lang='scss' scoped>
.elRowLeft {
    margin: 20px;
}
.underCode {
    position: absolute;
    left: -17%;
    top: 300px;
    width: 900px;
    height: 400px;
    overflow-y: auto;
    background-color: #fff;
}
.all-block-pager {
    background-color: #fff;
    margin-bottom: 2rem;
}
.close {
    float: right;
    border: none;
}
.close:hover {
    background-color: #fff;
}
::v-deep .el-textarea__inner,
.el-textarea {
    min-height: 100px !important;
}
</style>
