<template>
    <div>
        <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="场所类型" prop="name">
                        <el-select v-model="form.sistType">
                            <el-option v-for="item in sistTypeArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="代码" prop="racode">
                        <el-input v-model="form.racode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="风险因素" prop="rfactor">
                        <el-input v-model="form.rfactor"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-form-item label="风险因素分析" prop="analysis">
                        <el-input v-model="form.analysis" type="textarea"></el-input>
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

import { riskAdd, riskEdit } from '@/api/engineering/system/public'
export default {
    props: ["rowData"],
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
            },
            tableData: [],
            total: 0,
            form: {
                rfactor: "",
                racode: "",
                analysis: "",
                sistType: ""
            },
            formRules: {
                racode: [{ required: true, message: "请填写代码", trigger: "blur" }],
                analysis: [{ required: true, message: "请填写风险因素分析", trigger: "blur" }],
                rfactor: [{ required: true, message: "请填写风险因素", trigger: "blur" }],
                sistType: [{ required: true, message: "请选择场所类型", trigger: "blur" }],
            },
            sistTypeArr: [
                { label: '宣传教育场所', id: 1 },
                { label: '物资储备场所', id: 2 },
                { label: '办公场所', id: 3 },
                { label: '停车和交通场所', id: 4 },
                { label: '商业场所', id: 5 },
                { label: '文化体育场所', id: 6 },
                { label: '旅馆和集体员工宿舍', id: 7 },
                { label: '部分闲置人防工程', id: 8 },
            ],
            formData: this.rowData ? this.rowData[0] : null,
        }
    },
    created () {
    },
    mounted () {
        this.$nextTick(() => {
            if (this.formData != null) {
                let rowData = this.formData
                this.form.rfactor = rowData.rfactor
                this.form.racode = rowData.racode
                this.form.analysis = rowData.analysis
                this.form.sistType = rowData.sistType

            }
        });
    },
    methods: {
        saveAndEidt () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.formData != null) {
                        this.form.rasId = this.formData.rasId
                        riskEdit(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.$parent.$parent.dialogFormVisible = false
                                this.$parent.$parent.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        riskAdd(this.form).then(res => {
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
        //点击分页
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
.el-select {
    width: 100%;
}
.underCode {
    position: absolute;
    left: 11%;
    top: 90px;
    width: 100%;
    height: 400px;
    overflow-y: auto;
    background-color: #fff;
}
.all-block-pager {
    background-color: #fff;
    margin-bottom: 2rem;
}
</style>
