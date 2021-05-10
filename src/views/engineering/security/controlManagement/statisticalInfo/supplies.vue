<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="4">
                <leftTree @treeData="getTreeData"></leftTree>
            </el-col>
            <el-col :span="20">
                <el-table border :data="tableData" style="width:100%;margin-top: 10px" v-show="!isShowTable">
                    <el-table-column prop="county" label="所属区" align="center"></el-table-column>
                    <el-table-column prop="180125152941523fa088e9b26769ba75" label="防汛抢险舟(艘)" align="center"></el-table-column>
                    <el-table-column prop="1801251529561151a6c9006ca8d09e90" label="救生衣(件)" align="center"></el-table-column>
                    <el-table-column prop="1801251531070166ae5b47d0f2f7a588" label="草袋(万条)" align="center"></el-table-column>
                    <el-table-column prop="18012515312057488df098ccdc90a0ff" label="麻袋(万条)" align="center"></el-table-column>
                    <el-table-column prop="1801251531329060bc57c2b9eeed9e18" label="编织袋(万条)" align="center"></el-table-column>
                    <el-table-column prop="1801251531460431ad79e61962cb91c0" label="无纺布(平米)" align="center"></el-table-column>
                    <el-table-column prop="180125153157363eb7ba069d52064e43" label="铅丝(吨)" align="center"></el-table-column>
                    <el-table-column prop="1801251532191074a91e5216a6ce0376" label="桩木(立米)" align="center"></el-table-column>
                    <el-table-column prop="180125153756502a86a13d87a9ef11c2" label="块石(立米)" align="center"></el-table-column>
                    <el-table-column prop="1801251538174667b9ca1e9f6f1db8d1" label="砂石料(立米)" align="center"></el-table-column>
                    <el-table-column prop="180125153835591d942bc7702cbb2dbf" label="大型作业灯(个)" align="center"></el-table-column>
                    <el-table-column prop="180125153902502fa62ea965d96d9729" label="运输车(辆)" align="center"></el-table-column>
                    <el-table-column prop="180125153928693faeb26f79387658d8" label="铲吊车(辆)" align="center"></el-table-column>
                    <el-table-column prop="1801251539425292a86bbf82d3b59fbb" label="发电机(台)" align="center"></el-table-column>
                    <el-table-column prop="180125154114312ea74562c24f5dc6e1" label="水泵(台)" align="center"></el-table-column>
                </el-table>

                <el-table border :data="tableData2" style="width:100%;margin-top: 10px" v-show="isShowTable">
                    <el-table-column prop="storeUnit" label="储备单位" align="center"></el-table-column>
                    <el-table-column prop="storeSite" label="储备地点" align="center"></el-table-column>
                    <el-table-column prop="principal" label="负责人" align="center"></el-table-column>
                    <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
                    <el-table-column prop="180125152941523fa088e9b26769ba75" label="防汛抢险舟(艘)" align="center"></el-table-column>
                    <el-table-column prop="1801251529561151a6c9006ca8d09e90" label="救生衣(件)" align="center"></el-table-column>
                    <el-table-column prop="1801251531070166ae5b47d0f2f7a588" label="草袋(万条)" align="center"></el-table-column>
                    <el-table-column prop="18012515312057488df098ccdc90a0ff" label="麻袋(万条)" align="center"></el-table-column>
                    <el-table-column prop="1801251531329060bc57c2b9eeed9e18" label="编织袋(万条)" align="center"></el-table-column>
                    <el-table-column prop="1801251531460431ad79e61962cb91c0" label="无纺布(平米)" align="center"></el-table-column>
                    <el-table-column prop="180125153157363eb7ba069d52064e43" label="铅丝(吨)" align="center"></el-table-column>
                    <el-table-column prop="1801251532191074a91e5216a6ce0376" label="桩木(立米)" align="center"></el-table-column>
                    <el-table-column prop="180125153756502a86a13d87a9ef11c2" label="块石(立米)" align="center"></el-table-column>
                    <el-table-column prop="1801251538174667b9ca1e9f6f1db8d1" label="砂石料(立米)" align="center"></el-table-column>
                    <el-table-column prop="180125153835591d942bc7702cbb2dbf" label="大型作业灯(个)" align="center"></el-table-column>
                    <el-table-column prop="180125153902502fa62ea965d96d9729" label="运输车(辆)" align="center"></el-table-column>
                    <el-table-column prop="180125153928693faeb26f79387658d8" label="铲吊车(辆)" align="center"></el-table-column>
                    <el-table-column prop="1801251539425292a86bbf82d3b59fbb" label="发电机(台)" align="center"></el-table-column>
                    <el-table-column prop="180125154114312ea74562c24f5dc6e1" label="水泵(台)" align="center"></el-table-column>
                </el-table>
            </el-col>
        </el-row>

    </div>
</template>


<script>
import { suppliesList, suppliesDivisionsList } from "@/api/engineering/security/controlManagement"

import leftTree from './leftTree'

export default {
    components: {
        leftTree
    },
    watch: {
        'divisions': function (newVal) {
            this.divisions = newVal
            if (newVal == '全市') {
                this.isShowTable = false
                this.getTableDataList()
            } else {
                this.isShowTable = true
                this.getTableDataList2(newVal)
            }
        }
    },
    data () {
        return {
            tableData: [],
            tableData2: [],
            divisions: '',
            isShowTable: false
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () {
            suppliesList().then(res => {
                this.tableData = res
            })
        },
        getTableDataList2 () {
            suppliesDivisionsList(this.divisions).then(res => {
                this.tableData2 = res
            })
        },
        getTreeData (data) {
            this.divisions = data.label
        }
    },
}
</script>


<style lang='scss' scoped>
</style>
