<template>
    <div>
        <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="所属单位" prop="orgId">
                        <treeselect ref="headerChild" style="width: 100%;margin-top: -40px" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属仓库" prop="storeId">
                        <el-select v-model="form.storeId">
                            <el-option v-for="item in warehouseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="货架名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="录入时间" prop="createDate">
                        <el-date-picker v-model="form.createDate" value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="是否为空" prop="isEmpty">
                        <el-select v-model="form.isEmpty" prop="">
                            <el-option v-for="item in empty" :key="item.id" :label="item.label" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
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
            <el-button type="primary" @click="saveAndEdit">保 存</el-button>
        </div>
    </div>
</template>


<script>
import { shelvesAdd, shelvesEdit, warehouseList } from "@/api/supplies/system/shelves"

import treeselect from "@/components/treeselect";
export default {
    components: {
        treeselect
    },
    props: ['rowData'],
    data () {
        return {
            warehouseList: [], // 所属仓库
            info: {
                pageSize: 999999,
                pageNum: 1
            },
            form: {
                orgId: "",
                isEmpty: "",
                createDate: "",
                orgName: "",
                name: "",
                storeId: "",
            },
            formRules: {},
            empty: [
                { id: 0, label: "空" },
                { id: 1, label: "否" }
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
                this.form.orgId = rowData.orgId
                this.form.isEmpty = parseInt(rowData.isEmpty)
                this.form.createDate = rowData.createDate
                this.form.orgName = rowData.orgName
                this.form.name = rowData.name
                this.form.storeId = rowData.storeId
                this.$refs.headerChild.department = rowData.orgId
            }
            this.getWarehouseList()
        });
    },
    methods: {
        getWarehouseList () {
            warehouseList(this.info).then(res => {
                if (res.code == 200) {
                    this.warehouseList = res.rows
                }
            })
        },
        saveAndEdit () {
            // this.$refs.form.validate(valid => {
            //     if (valid) {
            this.form.orgId = this.$refs.headerChild.department
            if (this.rowData != null) {
                this.form.id = this.formData.id
                shelvesEdit(this.form).then(res => {
                    if (res.code == 200) {
                        this.msgSuccess(res.msg)
                        this.$parent.$parent.dialogFormVisible = false
                        this.$parent.$parent.getTableDataList()
                    } else {
                        this.msgError(res.msg)
                    }
                })
            } else {
                shelvesAdd(this.form).then(res => {
                    if (res.code == 200) {
                        this.msgSuccess(res.msg)
                        this.$parent.$parent.dialogFormVisible = false
                        this.$parent.$parent.getTableDataList()
                    } else {
                        this.msgError(res.msg)
                    }
                })
            }

            //     }
            // })

        },
        close () {
            this.$parent.$parent.dialogFormVisible = false
        }
    },
}
</script>


<style lang='scss' scoped>
</style>
