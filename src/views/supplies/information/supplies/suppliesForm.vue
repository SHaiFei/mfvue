<template>
    <div>
        <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="物资类别" prop="categoriesid">
                        <el-select clearable v-model="form.categoriesid">
                            <el-option v-for="item in categoriesList" :key="item.ID" :value="item.ID" :label="item.NAME">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="物资名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="物资型号" prop="model">
                        <el-input v-model="form.model"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属单位" prop="deptid">
                        <treeselect ref="headerChild" style="width: 100%;margin-top: -40px" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="物资数量" prop="quantity">
                        <el-input v-model="form.quantity"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="计量单位" prop="jldw">
                        <el-input v-model="form.jldw"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <!-- <el-col :span="12">
                    <el-form-item label="所属物资库" prop="nr">
                        <el-input v-model="form.nr"></el-input>
                    </el-form-item>
                </el-col> -->
                <el-col :span="12">
                    <el-form-item label="所属货架" prop="shelfid">
                        <el-select clearable v-model="form.shelfid">
                            <el-option v-for="item in shelvesList" :key="item.ID" :value="item.ID" :label="item.NAME">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="物资批次" prop="batch">
                        <el-input v-model="form.batch"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="物资批次" prop="batch">
                        <el-input v-model="form.batch"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> -->
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="供应商" prop="supplierid">
                        <el-select clearable v-model="form.supplierid">
                            <el-option v-for="item in supplierList" :key="item.SUPPLIER_ID" :value="item.SUPPLIER_ID" :label="item.SUPPLIER_NAME">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="保质期(月)" prop="quantityperiod">
                        <el-input v-model="form.quantityperiod"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="保修期(年)" prop="warrantyperiod">
                        <el-input v-model="form.warrantyperiod"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="报废年限" prop="scrapperiod">
                        <el-input v-model="form.scrapperiod"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="生产日期" prop="productiondate">
                        <el-date-picker v-model="form.productiondate" value-format="yyyy-MM-dd " type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="采购日期" prop="purchasedate">
                        <el-date-picker v-model="form.purchasedate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="登记时间" prop="nr">
                        <el-input v-model="form.nr"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="操作人" prop="nr">
                        <el-input v-model="form.nr"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> -->
            <!-- <el-row :gutter="24">
                <el-col :span="24">
                    <el-form-item label="备注" prop="nr">
                        <el-input v-model="form.nr" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> -->
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="saveEidt">保 存</el-button>
        </div>
    </div>
</template>


<script>
import { deptList } from '@/api/examination/selftest'
import { suppilesType, shelvesList, supplierList, suppliesAdd, suppliesEdit } from "@/api/supplies/supplies"

import treeselect from "@/components/treeselect";
export default {
    components: {
        treeselect
    },
    props: ["rowData"],
    data () {
        return {
            form: {
                deptid: '',
                name: "",
                model: "",
                categoriesid: "",
                batch: "",
                quantity: "",
                jldw: "",
                shelfid: "",
                supplierid: "",
                quantityperiod: "",
                warrantyperiod: "",
                scrapperiod: "",
                productiondate: "",
                purchasedate: ""
            },
            formRules: {
                categoriesid: [{ required: true, message: "请选择屋子类别", trigger: "blur" }],
                shelfid: [{ required: true, message: "请选择所属货架", trigger: "blur" }],
                supplierid: [{ required: true, message: "请选择供应商", trigger: "blur" }],
            },
            categoriesList: [], // 物资类别列表
            supplierList: [], // 供货商列表
            shelvesList: [], // 货架列表
            formData: this.rowData ? this.rowData[0] : null
        }
    },
    created () {
        this.getSuppliesType()
        this.getShelvesList()
        this.getSupplierList()
    },
    mounted () {
        this.$nextTick(() => {
            if (this.formData != null) {
                let rowData = this.formData
                this.form.name = rowData.name
                this.form.model = rowData.model
                this.form.categoriesid = rowData.categoriesid
                this.form.batch = rowData.batch
                this.form.quantity = rowData.quantity
                this.form.jldw = rowData.jldw
                this.form.shelfid = rowData.shelfid
                this.form.supplierid = rowData.supplierid
                this.form.quantityperiod = rowData.quantityperiod
                this.form.warrantyperiod = rowData.warrantyperiod
                this.form.scrapperiod = rowData.scrapperiod
                this.form.productiondate = rowData.productiondate
                this.form.purchasedate = rowData.purchasedate
                this.$refs.headerChild.department = rowData.deptid
            }
        });
    },
    methods: {
        // this.$refs.headerChild.department
        getSuppliesType () { // 获取物资类型
            suppilesType().then(res => {
                if (res.code == 200) {
                    this.categoriesList = res.data
                }
            })
        },
        getShelvesList () { // 获取所属货架
            shelvesList().then(res => {
                this.shelvesList = res.data
            })
        },
        getSupplierList () { //获取供应商
            supplierList().then(res => {
                this.supplierList = res.data
            })
        },
        saveEidt () { // 保存或者修改
            this.form.deptid = this.$refs.headerChild.department
            // if (this.form.deptid == "" && this.form.deptid != null) {
            //     return this.msgError('请选择所属单位')
            // }
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.rowData != null) {
                        this.form.id = this.formData.id
                        suppliesEdit(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.$parent.$parent.dialogFormVisible = false
                                this.$parent.$parent.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        suppliesAdd(this.form).then(res => {
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
.el-date-editor {
    width: 100%;
}
</style>
