<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="4">
                <leftTree @treeData="getTreeData"></leftTree>
            </el-col>
            <el-col :span="20">
                <el-table border :data="tableData" style="width:100%;margin-top: 10px" v-show="!isShowTable">
                    <el-table-column prop="DIVISIONS" label="所属区" align="center"></el-table-column>
                    <el-table-column prop="EMERNUMBER" label="抢险人数" align="center"></el-table-column>
                </el-table>

                <el-table border :data="tableData2" style="width:100%;margin-top: 10px" v-show="isShowTable">
                    <el-table-column prop="site" label="地点" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="dangerType" label="险情类别" align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.dangerType == '1'">红</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cause" label="造成险情原因" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="" label="抢险预案" align="center">
                        <el-table-column prop="measures" label="抢险措施" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="emerNumber" label="抢险人数" align="center"></el-table-column>
                        <el-table-column prop="arrivalTime" label="到达现场实践" align="center"></el-table-column>
                    </el-table-column>
                    <el-table-column prop="dutyUnit" label="责任单位" align="center"></el-table-column>
                    <el-table-column prop="responsible" label="负责人" align="center"></el-table-column>
                    <el-table-column prop="phone" label="办公电话或手机" align="center"></el-table-column>
                </el-table>
            </el-col>
        </el-row>

    </div>
</template>


<script>
import { measuresCityList, measuresDivisionsList } from "@/api/engineering/security/controlManagement"

import leftTree from './leftTree'

export default {
    components: {
        leftTree
    },
    watch: {
        'divisions': function (newVal) {
            this.divisions = newVal
            if (newVal == '全市'){
                this.isShowTable = false
                this.getTableDataList(newVal)
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
            measuresCityList().then(res => {
                console.log(res);
                this.tableData = res
            })
        },
        getTableDataList2 () {
            measuresDivisionsList(this.divisions).then(res => {
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
