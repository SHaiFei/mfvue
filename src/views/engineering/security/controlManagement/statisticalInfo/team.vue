<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="4">
                <leftTree @treeData="getTreeData"> </leftTree>
            </el-col>
            <el-col :span="20">
                <el-table border :data="tableData" style="width:100%;margin-top: 10px" v-show="!isShowTable">
                    <el-table-column prop="orgName" label="所属区" align="center"></el-table-column>
                    <el-table-column prop="zyqx" label="专业抢险队伍" align="center"></el-table-column>
                    <el-table-column prop="zdbd" label="驻地部队抢险队伍" align="center"></el-table-column>
                    <el-table-column prop="qtqx" label="其他抢险队伍" align="center"></el-table-column>
                    <el-table-column prop="heji" label="合计" align="center"></el-table-column>
                </el-table>

                <el-table border :data="tableData2" style="width:100%;margin-top: 10px" v-show="isShowTable">
                    <el-table-column prop="nature" label="队伍性质" align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.nature == '1'">专业抢险队伍</div>
                            <div v-if="scope.row.nature == '2'">驻地部队抢险队伍</div>
                            <div v-if="scope.row.nature == '3'">其他抢险队伍</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="affiliation" label="单位名称" align="center"></el-table-column>
                    <el-table-column prop="name" label="抢险队伍名称" align="center"></el-table-column>
                    <el-table-column prop="population" label="队伍人数" align="center"></el-table-column>
                    <el-table-column prop="handset" label="联系方式" align="center"></el-table-column>
                    <el-table-column label="单位负责人" align="center">
                        <el-table-column prop="unitPrincipal" label="姓名" align="center"></el-table-column>
                        <el-table-column prop="dutys" label="职务" align="center"></el-table-column>
                        <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
                    </el-table-column>
                    <el-table-column prop="obligation" label="队伍职责" align="center"></el-table-column>
                    <el-table-column prop="facility" label="抢险设备" align="center"></el-table-column>
                    <el-table-column prop="teamSite" label="队伍分布位置" align="center"></el-table-column>
                </el-table>
            </el-col>
        </el-row>

    </div>
</template>


<script>
import { teamList, teamDivisionsList } from "@/api/engineering/security/controlManagement"

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
    mounted () {

    },
    methods: {
        getTableDataList () {
            teamList().then(res => {
                this.tableData = res
            })
        },
        getTableDataList2 () {
            teamDivisionsList(this.divisions).then(res => {
                if (res.code == 200) {
                    this.tableData2 = res.rows
                }
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
