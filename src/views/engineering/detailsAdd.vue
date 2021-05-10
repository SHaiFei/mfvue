<template>
    <div class="all-data-detail">
        <!-- <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>在线考试</el-breadcrumb-item>
            <el-breadcrumb-item>考试管理</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb> -->
        <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="竣工验收备案申请表" name="project1">
                <el-form :model="form1" ref="form1" label-width="auto" :rules="form1Rules" v-if="activeName == 'project1'">
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="项目名称" prop="PROJECTNAME">
                                <el-input v-model="form1.PROJECTNAME"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="监督报告编号" prop="JDBGBH">
                                <el-input v-model="form1.JDBGBH"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="建设单位名称" prop="COMPANY1">
                                <el-input v-model="form1.COMPANY1"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所属街道" prop="STREET_NAME">
                                <el-select v-model="form1.STREET_NAME" filterable placeholder="所属街道">
                                    <el-option v-for="item in streetNameList" :key="item.ID" :label="item.STREET_NAME" :value="item.ID">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <!-- <el-form-item label="所属街道" prop="STREET_NAME">
                                <el-input v-model="form1.STREET_NAME"></el-input>
                            </el-form-item> -->
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="联系人" prop="COMPRNY1LXR">
                                <el-input v-model="form1.COMPRNY1LXR"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="固定电话" prop="COMPRNY1DH">
                                <el-input v-model="form1.COMPRNY1DH"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="24">
                            <el-form-item label="施工单位名称" prop="COMPANY2">
                                <el-input v-model="form1.COMPANY2"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="联系人" prop="COMPANY2LXR">
                                <el-input v-model="form1.COMPANY2LXR"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="固定电话" prop="COMPANY2DH">
                                <el-input v-model="form1.COMPANY2DH"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="建设地址" prop="ADDRESS">
                                <el-input v-model="form1.ADDRESS"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="结构形式" prop="STRUCTURE">
                                <el-select v-model="form1.STRUCTURE" filterable placeholder="结构形式">
                                    <el-option v-for="item in structureList" :key="item.id" :label="item.label" :value="item.id">
                                    </el-option>
                                </el-select>
                                <!-- <el-input v-model="form1.STRUCTURE"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="单位信息" name="project2" :disabled="isDisabled">
                <el-form :model="form2" ref="form2" label-width="auto" v-if="activeName == 'project2'">
                    <!-- company1 -->
                    <el-row :gutter="24">
                        <el-col :span="8" style="margin-top: 30px">
                            <el-form-item label="建设单位(盖章)" prop="COMPANY1">
                                <el-input v-model="form2.COMPANY1"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="联系人" prop="COMPRNY1FR">
                                <el-input v-model="form2.COMPRNY1FR"></el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="COMPRNY1FRDH">
                                <el-input v-model="form2.COMPRNY1FRDH"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人" prop="COMPRNY1LXR">
                                <el-input v-model="form2.COMPRNY1LXR"></el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="COMPRNY1DH">
                                <el-input v-model="form2.COMPRNY1DH"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- company2 -->

                    <el-row :gutter="24">
                        <el-col :span="8" style="margin-top: 30px">
                            <el-form-item label="设计单位" prop="COMPANY2">
                                <el-input v-model="form2.COMPANY2"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人" prop="COMPRNY2FR">
                                <el-input v-model="form2.COMPRNY2FR"></el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="COMPRNY2FRDH">
                                <el-input v-model="form2.COMPRNY2FRDH"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人" prop="COMPRNY2LXR">
                                <el-input v-model="form2.COMPRNY2LXR"></el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="COMPRNY2DH">
                                <el-input v-model="form2.COMPRNY2DH"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- company3 -->

                    <el-row :gutter="24">
                        <el-col :span="8" style="margin-top: 30px">
                            <el-form-item label="建立单位" prop="COMPANY3">
                                <el-input v-model="form2.COMPANY3"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人" prop="COMPRNY3FR">
                                <el-input v-model="form2.COMPRNY3FR"></el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="COMPRNY3FRDH">
                                <el-input v-model="form2.COMPRNY3FRDH"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人" prop="COMPRNY3LXR">
                                <el-input v-model="form2.COMPRNY3LXR"></el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="COMPRNY3DH">
                                <el-input v-model="form2.COMPRNY3DH"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- COMPANY4 -->
                    <el-row :gutter="24">
                        <el-col :span="8" style="margin-top: 30px">
                            <el-form-item label="施工单位" prop="COMPANY4">
                                <el-input v-model="form2.COMPANY4"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人" prop="COMPRNY4FR">
                                <el-input v-model="form2.COMPRNY4FR"></el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="COMPRNY4FRDH">
                                <el-input v-model="form2.COMPRNY4FRDH"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人" prop="COMPRNY4LXR">
                                <el-input v-model="form2.COMPRNY4LXR"></el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="COMPRNY4DH">
                                <el-input v-model="form2.COMPRNY4DH"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="统计表" name="project3" :disabled="isDisabled">
                <el-form :model="form3" class="form3" ref="form3" label-width="auto" v-if="activeName == 'project3'">
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="总建筑面积" prop="ZONGMJ">
                                <el-input v-model="form3.ZONGMJ"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="工程类别" prop="GCLB">
                                <el-select v-model="form3.GCLB" placeholder="工程类别">
                                    <el-option v-for="item in engineeringType" :key="item.id" :label="item.label" :value="item.id">
                                    </el-option>
                                </el-select>
                                <!-- <el-input v-model="form3.GCLB"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="人防工程编号" prop="GCBH">
                                <el-input v-model="form3.GCBH"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="角度坐标" prop="JDZB">
                                <el-input v-model="form3.JDZB"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="人防建筑面积(㎡)" prop="JZMJ">
                                <el-input v-model="form3.JZMJ"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="结构形式" prop="JGXS">
                                <el-select v-model="form3.JGXS" placeholder="结构形式">
                                    <el-option v-for="item in structureList" :key="item.id" :label="item.label" :value="item.id">
                                    </el-option>
                                </el-select>
                                <!-- <el-input v-model="form3.JGXS"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="通道面积(㎡)" prop="TDMJ">
                                <el-input v-model="form3.TDMJ"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="用房面积(㎡)" prop="GLYFMJ">
                                <el-input v-model="form3.GLYFMJ"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="平时用途" prop="PEACE_USE">
                                <el-select v-model="form3.PEACE_USE" placeholder="平时用途">
                                    <el-option v-for="item in ordinaryTimesList" :key="item.ID" :label="item.NAME" :value="item.ID">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="战时功能" prop="ZSGN">
                                <el-select v-model="form3.ZSGN" placeholder="战时功能">
                                    <el-option v-for="item in wartimeList" :key="item.ID" :label="item.NAME" :value="item.ID">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="抗力等级" prop="KLDJ">
                                <el-input v-model="form3.KLDJ"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="防化等级" prop="FHDJ">
                                <el-input v-model="form3.FHDJ"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="开工时间" prop="KGSJ">
                                <el-input v-model="form3.KGSJ"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="验收时间" prop="YSSJ">
                                <el-input v-model="form3.YSSJ"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="地下层数" prop="DXCS">
                                <el-input v-model="form3.DXCS"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="地上层数" prop="DSCS">
                                <el-input v-model="form3.DSCS"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="人防所在层" prop="RFSZC">
                                <el-input v-model="form3.RFSZC"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="报警器位置" prop="BJQWZ">
                                <el-input v-model="form3.BJQWZ"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="防护单元数量" prop="DYSL">
                                <el-input v-model="form3.DYSL"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="高点监控位置" prop="JKWZ">
                                <el-input v-model="form3.JKWZ"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="工程内车位数" prop="GCNCWS">
                                <el-input v-model="form3.GCNCWS"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="通知单号" prop="TZDH">
                                <el-input v-model="form3.TZDH"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="24">
                            <el-form-item label="工程地址" prop="ADDRESS">
                                <el-input v-model="form3.ADDRESS"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-bottom: 10px">
                        <el-button @click="addDomain" size="small" type="primary">添加</el-button>
                        <el-button @click="removeDomain" size="small" type="danger">删除</el-button>
                    </el-row>
                    <el-row :gutter="24" v-for="(domain, index) in domains" :key="domain.key">
                        <el-col :span="12">
                            <el-form-item label="防护单元编号">
                                <span class="verification">{{ domain.FHDYBH }}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="现场核查内容情况">
                                <span class="addVerification" @click="addVerification(domain)">{{ domain.value2 }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>
            <div class="all-block-pager">
                <el-button type="primary" size="small" @click="save">保存</el-button>
                <el-button type="primary" size="small" @click="back">返回</el-button>
            </div>
        </el-tabs>
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="60%" v-if="dialogFormVisible" :close-on-click-modal="false" class="dialogForm">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="add" style="margin-bottom: 15px">
                增加
            </el-button>
            <el-table :data="tableData" style="width:100%" border>
                <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                <el-table-column prop="big_type" label="大类设备" align="center">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.big_type" placeholder="大类设备">
                            <el-option v-for="item in equipmentList" :key="item.ID" :label="item.NAME" :value="item.ID">
                            </el-option>
                        </el-select>
                        <!-- <el-input v-model=""></el-input> -->
                    </template>
                </el-table-column>
                <el-table-column prop="sn" label="设备名称" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.sn"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="product_model" label="设备型号" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.product_model"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="quantity" label="数量" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.quantity"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="100">
                    <template slot-scope="scope">
                        <el-button type="danger" size="small" @click="del(scope.row, scope.$index)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button @click="saveFrom" type="primary">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { projectAdd1, projectAdd2, projectAdd3, projectDyi, projectDyu, projectDelete, projectEdit, projectView, getStreetNameList, ordinaryTimes, wartime, equipment } from '@/api/engineering/detailsadd'

export default {
    watch: {
        "activeName": function (val) {
            if (val == "project3") {
                this.getOrdinaryUse()
                this.getWartimeList()
                this.getEquipment()
            }
        }
    },
    data () {
        return {
            tableData: [],
            dialogFormVisible: false,//增加弹窗
            activeName: "project1",
            isDisabled: true,
            form1: {
                PROJECTNAME: "",
                JDBGBH: "",
                COMPANY1: "",
                STREET_NAME: "",
                COMPRNY1LXR: "",
                COMPRNY1DH: "",
                COMPANY2: "",
                COMPANY2lxr: "",
                COMPANY2LXR: "",
                COMPANY2DH: "",
                ADDRESS: "",
                STRUCTURE: ""
            },
            streetNameList: [], // 所属街道
            form1Rules: {
                PROJECTNAME: [{ required: true, message: "请填写项目名称", trigger: "blur" }]
            },
            form2: {
                COMPANY1: "",
                COMPRNY1FR: "",
                COMPRNY1LXR: "",
                COMPRNY1FRDH: "",
                COMPRNY1DH: "",
                COMPANY2: "",
                COMPRNY2FR: "",
                COMPRNY2LXR: "",
                COMPRNY2FRDH: "",
                COMPRNY2DH: "",
                COMPANY3: "",
                COMPRNY3FR: "",
                COMPRNY3LXR: "",
                COMPRNY3FRDH: "",
                COMPRNY3DH: "",
                COMPANY4: "",
                COMPRNY4FR: "",
                COMPRNY4LXR: "",
                COMPRNY4FRDH: "",
                COMPRNY4DH: ""
            },
            form3: {
                ZONGMJ: "",
                GCLB: "",
                GCBH: "",
                JDZB: "",
                JZMJ: "",
                JGXS: "",
                TDMJ: "",
                GLYFMJ: "",
                PEACE_USE: "",
                ZSGN: "",
                KLDJ: "",
                YSSJ: "",
                DXCS: "",
                DSCS: "",
                RFSZC: "",
                BJQWZ: "",
                DYSL: "",
                JKWZ: "",
                GCNCWS: "",
                TZDH: "",
                FHDJ: "",
                ADDRESS: ""
            },
            structureList: [  //   结构形式
                { label: "框架", id: "1" },
                { label: "框剪", id: "2" }
            ],
            engineeringType: [  // 工程管理
                { label: "住宅", id: "1" },
                { label: "公建", id: "2" }
            ],
            wartimeList: [], // 战时功能
            ordinaryTimesList: [], // 平时用途
            equipmentList: [],  // 设备
            domains: [],
            projectId: undefined,  // 项目id
            verificationId: undefined, // 单元id
        }

    },
    created () {
        this.getStreetList()
    },
    mounted () {
    },
    methods: {
        save () { // 公用保存
            if (this.activeName == "project1") {
                if (this.projectId != undefined) {
                    this.projectEdit()
                } else {
                    this.projectOne()
                }
            } else if (this.activeName == "project2") {
                this.projectTwo()
            } else if (this.activeName == "project3") {
                this.projectThree()
            }
        },
        add () { // 单元设备表格添加行
            this.tableData.push({ big_type: "", sn: "", product_model: "", quantity: "" })
        },
        addVerification (val) { //  核查内容
            this.tableData = []
            this.verificationId = val.id
            let params = {
                dyid: val.id
            }
            projectView(params).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data 
                    this.dialogFormVisible = true
                }
            })
        },
        addDomain () {  // 动态添加单元
            let params = new FormData()
            params.append("PROJECTID", this.projectId)
            projectDyi(params).then(res => {
                if (res.code == 200) {
                    this.domains.push({
                        FHDYBH: res.data.bh,
                        value2: "核查内容",
                        key: Date.now(),
                        id: res.data.id
                    })
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        removeDomain () { // 删除动态添加
            let params = new FormData()
            params.append("dyid", this.domains[this.domains.length - 1].id)
            projectDelete(params).then(res => {
                if (res.code == 200) {
                    this.domains.pop()
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        saveFrom () { //  单元设备保存按钮
            let params = {}
            params.dyid = this.verificationId
            params.fhSbList = this.tableData
            projectDyu(params).then(res => {
                if (res.code == 200) {
                    this.msgSuccess(res.msg)
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        del (row, i) {
            this.tableData.splice(i, 1)
        },
        projectOne () { //  列表 1 添加
            this.$refs.form1.validate(valid => {
                if (valid) {
                    projectAdd1(this.form1).then(res => {
                        if (res.code == 200) {
                            this.projectId = res.data.id
                            this.isDisabled = false
                            this.msgSuccess(res.msg)
                        } else {
                            this.msgError(res.msg)
                        }
                    })
                }
            })
        },
        projectEdit () {   // 页签1 修改
            this.form1.PROJECTID = this.projectId
            projectEdit(this.form1).then(res => {
                if (res.code == 200) {
                    this.msgSuccess(res.msg)
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        projectTwo () { //  列表 2 添加
            this.form2.PROJECTID = this.projectId
            projectAdd2(this.form2).then(res => {
                if (res.code == 200) {
                    this.msgSuccess(res.msg)
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        projectThree () { //  列表 3 添加
            this.form3.PROJECTID = this.projectId
            projectAdd3(this.form3).then(res => {
                if (res.code == 200) {
                    this.msgSuccess(res.msg)
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        getStreetList () { // 获取所属街道列表
            let params = { street_name: this.form1.STREET_NAME }
            getStreetNameList(params).then(res => {
                if (res.code == 200) {
                    this.streetNameList = res.data
                }
            })
        },
        getOrdinaryUse () {  //  获取平时用途
            ordinaryTimes().then(res => {
                if (res.code == 200) {
                    this.ordinaryTimesList = res.data
                }
            })
        },
        getWartimeList () { // 获取战时功能数据
            wartime().then(res => {
                if (res.code == 200) {
                    this.wartimeList = res.data
                }
            })
        },
        getEquipment () { // 获取设备列表
            equipment().then(res => {
                if (res.code == 200) {
                    this.equipmentList = res.data
                }
            })
        },
        back () { //返回上一层
            this.$router.go(-1)
        },
    }
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog .el-dialog__body {
    height: 550px !important;
    overflow-y: auto !important;
}
.el-form {
    padding: 0 100px;
}
.el-select {
    width: 100%;
}
.details,
.addVerification {
    color: blue;
    cursor: pointer;
    margin-left: 10px;
}
.verification {
    color: #606266;
    margin-left: 10px;
}
.el-form-item {
    margin-bottom: 10px !important;
}
::v-deep .form3 .el-form-item {
    border: 1px solid #ebeef5 !important;
    padding: 0 10px !important;
    margin-left: 5px;
    margin-bottom: 10px !important;
}
</style>
