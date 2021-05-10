<template>
    <div class="">
        <div class="elFormHeight">
            <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="牵头部门">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="区县">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="详细地址">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="状态">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="级别">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="经度">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="纬度">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="队伍分类">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分类">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="组织建制">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="任务分工">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="组建单位">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="组建时间">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="编制数量">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="负责人">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="装备种类">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="固定电话">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="装备数量">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="移动电话">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="数据统计时间">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="装备信息">
                            <el-input type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="装备力量">
                            <el-input type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 上传附件 -->
                <!-- <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="装备信息">
                            <el-input type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: right;margin-top: 20px">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="save">保 存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {

            },
            formRules: {

            }
        }
    },
    created () {

    },
    mounted () {

    },
    methods: {
        save () {

        },
        cancel () { // 取消按钮
            this.$parent.$parent.dialogVisible = false;
            this.reset();
        },
    },
}
</script>
<style lang='scss' scoped>
</style>
