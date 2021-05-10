<template>
    <div>
        <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="仓库名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="楼层" prop="floors">
                        <el-input v-model="form.floors"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="电梯" prop="elevator">
                        <el-select clearable v-model="form.elevator">
                            <el-option v-for="item in elevatorList" :key="item.id" :value="item.id" :label="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="仓库状态" prop="state">
                        <el-select clearable v-model="form.state">
                            <el-option v-for="item in stateList" :key="item.id" :value="item.id" :label="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="建筑面积" prop="buildingArea">
                        <el-input v-model="form.buildingArea"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话" prop="telphone">
                        <el-input v-model="form.telphone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="资源库负责人" prop="fzrId">
                        <el-input v-model="form.fzrId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="负责人领导" prop="leaderId">
                        <el-input v-model="form.leaderId"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="经度" prop="precision">
                        <el-input v-model="form.precision"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="纬度" prop="dimension">
                        <el-input v-model="form.dimension"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="人防工程名称" prop="projectname">
                        <el-input v-model="form.projectname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否是人防工程" prop="project">
                        <el-select clearable v-model="form.project">
                            <el-option v-for="item in projectList" :key="item.id" :value="item.id" :label="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="区县" prop="county">
                        <el-input v-model="form.county"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="saveEidt">保 存</el-button>
        </div>
    </div>
</template>


<script>
import { warehouseAdd } from "@/api/supplies/warehouse"

export default {
    props: ["rowData"],
    data () {
        return {
            form: {
                elevator: "",
                state: "",
                name: "",
                buildingArea: "",
                address: "",
                floors: "",
                fzrId: "",
                leaderId: "",
                drawingId: "",
                voidId: "",
                precision: "",
                dimension: "",
                projectname: "",
                project: "",
                county: "",
            },
            elevatorList: [ // 是否有电梯
                { label: "有", id: 1 },
                { label: "无", id: 0 }
            ],
            stateList: [     // 仓库状态
                { label: "在用", id: 1 },
                { label: "维修", id: 0 }
            ],
            projectList: [ // 是否是人防工程
                { label: "是", id: 1 },
                { label: "不是", id: 0 }
            ],
            formRules: {}
        }
    },
    created () {
        this.form = this.rowData[0]

    },
    mounted(){
    },
    methods: {
        saveEidt () { // 保存或者修改
            warehouseAdd(this.form).then(res => {
                if(res.code == 200) {
                    this.close()
                    this.$parent.$parent.getTableDataList()
                } else {
                    this.msgError(res.msg)
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
.el-date-editor {
    width: 100%;
}
</style>
