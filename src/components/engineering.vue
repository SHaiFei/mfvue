<template>
    <div class="elForm">
        <el-form :model="form" label-width="auto" ref="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="所属区" prop="county">
                        <areaCom ref="areaCom"></areaCom>
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
                    <el-form-item label="工程名称" prop="underName">
                        <el-input v-model="form.underName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="街道(乡镇)" prop="street">
                         <el-input v-model="form.street"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="路号" prop="roadNum">
                        <el-input v-model="form.roadNum"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="工程类别" prop="underType">
                         <el-input v-model="form.underType"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="场所类型" prop="noter">
                        <el-input v-model="form.noter"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="战时功能" prop="warUse">
                         <el-input v-model="form.warUse"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="总建筑面积" prop="fioorArea">
                        <el-input v-model="form.fioorArea"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="角点坐标" prop="corner">
                         <el-input v-model="form.corner"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="人防建筑面积" prop="underArea">
                        <el-input v-model="form.underArea"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="结构形式" prop="structural">
                         <el-input v-model="form.structural"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="人防室外口及通道面积" prop="channelArea">
                        <el-input v-model="form.channelArea"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="人防地面管理用房面积" prop="floorSpace">
                         <el-input v-model="form.floorSpace"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="抗力等级" prop="resistanceGrade">
                        <el-input v-model="form.resistanceGrade"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="防化等级" prop="chemicalGrade">
                         <el-input v-model="form.chemicalGrade"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="开工时间" prop="startUpTime">
                        <el-input v-model="form.startUpTime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="竣工验收时间" prop="completionTime">
                         <el-input v-model="form.completionTime"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="地下层数" prop="underLayerNum">
                        <el-input v-model="form.underLayerNum"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="地上层数" prop="layerNum">
                         <el-input v-model="form.layerNum"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="人防所在层" prop="underNum">
                        <el-input v-model="form.underNum"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="警报器位置" prop="alarmLocation">
                         <el-input v-model="form.alarmLocation"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="防护单元数量" prop="unitNum">
                        <el-input v-model="form.unitNum"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="高点监控位置" prop="hightPosition">
                         <el-input v-model="form.hightPosition"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="人防工程施工图备案通知单" prop="adviceNumber">
                        <el-input v-model="form.adviceNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否验收" prop="accYn">
                         <el-input v-model="form.accYn"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="使用状态" prop="useYn">
                        <el-input v-model="form.useYn"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="使用用途" prop="useTarget">
                         <el-input v-model="form.useTarget"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="使用单位" prop="useUnit">
                        <el-input v-model="form.useUnit"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="许可截止日期" prop="useDate">
                         <el-input v-model="form.useDate"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="联系人电话" prop="contactsOphone">
                        <el-input v-model="form.contactsOphone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
        </div>
    </div>
</template>


<script>

import areaCom from '@/components/area'
export default {
    components: {
        areaCom
    },
    props: ["rowData"],
    data () {
        return {
            form: {}
        }
    },
    created () {
        this.form = this.rowData[0]
    },
    mounted () {

    },
    methods: {
        close(){
            this.$emit("closeDialog")
        }
    },
}
</script>


<style lang='scss' scoped>
.elForm {
    height: 550px;
    overflow: hidden;
    overflow-y: auto;
}
</style>
