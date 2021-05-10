<template>
    <div class="">
        <div class="elFormHeight">
            <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="名称">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属区县">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="建设时间">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="乡镇">
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
                    <el-col :span="24">
                        <el-form-item label="位置">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="主要功能">
                            <el-input type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="设备">
                            <el-input type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="负责人">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="负责人电话">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="维护人">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="维护人电话">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 上传图片  视频 -->
                <!-- <el-row :gutter="24">
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
