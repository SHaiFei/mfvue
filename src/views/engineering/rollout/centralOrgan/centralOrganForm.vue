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
                        <el-date-picker v-model="form.ydate" value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-form-item label="工程列表" prop="dataName">
                        <el-input v-model="form.dataName" type="textarea" @focus="changeCode"></el-input>
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
                <el-table :data="tableData" stripe style="width:100%;margin-top: 10px" @selection-change='tableDataSelect'>
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

import { centralOrganAddList, centralOrganAdd, centralOrganEdit, scrapoutAdd, scrapoutEdit } from "@/api/engineering/security/centralOrgan"

import areaCom from '@/components/area'
export default {
    components: {
        areaCom
    },
    props: ["rowData", "formType"],
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                underName: "",
                receUnit: ""
            },
            action: this.GLOBAL.FILE_UPLOAD_URL + "/common/upload",
            fileList: [],
            fileUrl: "", // 文件路径
            fname: "", // 文件名称
            form: {
                receUnit: "",
                tranUnit: "",
                ydate: "",
                dataName: "",
                gcUndergroundTemp: null
            },
            formRules: {
                receUnit: [{ required: true, message: "请填写责任书名称", trigger: "blur" }],
                tranUnit: [{ required: true, message: "请填写存档人", trigger: "blur" }],
                ydate: [{ required: true, message: "请选择归档日期", trigger: "blur" }]
            },
            formData: this.rowData ? this.rowData[0] : null,
            isUnderCode: false,
            tableData: [],
            total: 0,
            centralOrganArr: [],
            gcUndergroundTemp: []
        }
    },
    created () {
    },
    mounted () {
        this.$nextTick(() => {
            if (this.formData != null) {
                let rowData = this.formData
                this.form.tranUnit = rowData.tranUnit
                this.form.receUnit = rowData.receUnit
                this.form.ydate = rowData.ydate
                rowData.tempList.forEach(item => {
                    let params = {}
                    params.underCode = item.underCode
                    params.underName = item.underName
                    this.gcUndergroundTemp.push(params)
                    this.form.dataName += `编号: ${item.underCode} ----  名称: ${item.underName} \n`
                })
            }
        });
    },
    methods: {
        getTableDataList () { // 题库维护列表
            centralOrganAddList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
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
            } else {
                this.msgError(file.msg)
            }
        },
        search () { // 查询
            this.queryInfo.pageNum = 1
            this.getTableDataList()
        },
        changeCode () { // 请求表格数据
            this.gcUndergroundTemp = []
            this.centralOrganArr = []
            this.form.gcUndergroundTemp = []
            this.form.dataName = ""
            this.isUnderCode = true
            this.getTableDataList()
        },
        closeCode () { // 关闭表格 处理数据
            let centralOrganArr = this.centralOrganArr
            centralOrganArr.forEach(item => {
                let params = {}
                params.underCode = item.underCode
                params.underName = item.underName
                params.county = item.county

                this.gcUndergroundTemp.push(params)

                this.form.dataName += `编号: ${item.underCode} ----  名称: ${item.underName} \n`
            })
            this.isUnderCode = false
        },
        tableDataSelect (val) {  //复选框改变
            this.centralOrganArr = val
        },
        saveAndEidt () { // 保存或者修改
            this.form.file = this.fileUrl
            this.form.name = this.fname
            this.form.gcUndergroundTemp = this.gcUndergroundTemp
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.formType == 'centralOrgan') {
                        if (this.rowData != null) {
                            this.form.documentAcceId = this.formData.documentAcceId
                            centralOrganEdit(this.form).then(res => {
                                if (res.code == 200) {
                                    this.msgSuccess(res.msg)
                                    this.$parent.$parent.dialogFormVisible = false
                                    this.$parent.$parent.getTableDataList()
                                } else {
                                    this.msgError(res.msg)
                                }
                            })
                        } else {
                            centralOrganAdd(this.form).then(res => {
                                if (res.code == 200) {
                                    this.msgSuccess(res.msg)
                                    this.$parent.$parent.dialogFormVisible = false
                                    this.$parent.$parent.getTableDataList()
                                } else {
                                    this.msgError(res.msg)
                                }
                            })
                        }
                    } else  if (this.formType == 'scrapout'){
                        if (this.rowData != null) {
                            this.form.documentAcceId = this.formData.documentAcceId
                            scrapoutEdit(this.form).then(res => {
                                if (res.code == 200) {
                                    this.msgSuccess(res.msg)
                                    this.$parent.$parent.dialogFormVisible = false
                                    this.$parent.$parent.getTableDataList()
                                } else {
                                    this.msgError(res.msg)
                                }
                            })
                        } else {
                            scrapoutAdd(this.form).then(res => {
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
    top: 140px;
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
</style>
