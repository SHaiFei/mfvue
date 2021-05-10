<template>
    <div>
        <el-form :model="form" label-width="auto" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="工程名称" prop="underName">
                        <el-input v-model="form.underName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="工程编号" prop="underCode">
                        <el-input v-model="form.underCode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="所属区" prop="county">
                        <el-input v-model="form.county"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="战时功能" prop="warUse">
                        <el-input v-model="form.warUse"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div>
            <el-row :gutter="24">
                <el-col :span="12">
                    <div>可用项</div>
                    <el-table :data="tableData" stripe style="width:100%;margin-top: 10px">
                        <el-table-column type="selection" width="50" align="center"></el-table-column>
                        <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                        <el-table-column prop="name" label="名称" align="center"></el-table-column>
                    </el-table>
                    <!-- <div class="all-block-pager">
                        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                    </div> -->
                </el-col>
                <el-col :span="12">
                    <div>禁用项</div>
                    <el-table :data="tableData2" stripe style="width:100%;margin-top: 10px">
                        <el-table-column type="selection" width="50" align="center"></el-table-column>
                        <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
                        <el-table-column prop="name" label="名称" align="center"></el-table-column>
                    </el-table>
                    <!-- <div class="all-block-pager">
                        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                    </div> -->
                </el-col>
            </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
        </div>
    </div>
</template>

<script>
import { usePlanningFormList2, usePlanningFormList1 } from '@/api/engineering/security/usePlanning'

export default {
    props: ["rowData"],
    data () {
        return {
            tableData2: [],
            tableData: [],
            form: {
                county: "",
                underName: "",
                warUse: "",
                underCode: "",
            },
            formData: this.rowData ? this.rowData[0] : null,
            queryInfo1: {
                pageSize: 10,
                pageNum: 1,
            },
            queryInfo2: {
                pageSize: 10,
                pageNum: 1,
            },
            total: 0,
            total2: 0
        }
    },
    created () {
        console.log(this.rowData);
    },
    mounted () {
        this.$nextTick(() => {
            if (this.formData != null) {
                let rowData = this.formData
                this.form.underName = rowData.underName
                this.form.warUse = rowData.warUse
                this.form.underCode = rowData.underCode
                this.form.county = rowData.county
            }
            this.getTableDataList()
        });
    },
    methods: {
        getTableDataList () { // 列表
            usePlanningFormList1(this.formData.underId).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                }
            });
            usePlanningFormList2(this.formData.underId).then(res => {
                if (res.code == 200) {
                    this.tableData2 = res.rows;
                    this.total2 = res.total; //总页数
                }
            });
        },
        close () {
            this.$emit("closeDialog")
        }
    },
}
</script>



<style lang='scss' scoped>
</style>
