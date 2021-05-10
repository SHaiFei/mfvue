<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>安全管理</el-breadcrumb-item>
            <el-breadcrumb-item>防汛管理</el-breadcrumb-item>
        </el-breadcrumb>
        <tab-pane :paneList="paneList"></tab-pane>
    </div>
</template>

<script>
import plan from './controlManagement/plan'
import measures from './controlManagement/measures'
import onDuty from './controlManagement/onDuty'
import rescueTeam from './controlManagement/rescueTeam'
import reserves from './controlManagement/reserves'
import governance from "./controlManagement/governance"
import statisticalInfo from './controlManagement/statisticalInfo'

import TabPane from '@/components/tabPane'
export default {
    components: {
        TabPane, plan, measures, onDuty, rescueTeam, reserves, statisticalInfo
    },
    data () {
        return {
            paneList: [ // tab页签 数据
                { name: "tabPane1", label: "防汛值班人员", flag: true, content: onDuty },
                { name: "tabPane2", label: "迎汛抢险队伍", flag: false, content: rescueTeam },
                { name: "tabPane3", label: "迎汛物资储备", flag: false, content: reserves },
                { name: "tabPane4", label: "隐患排查治理", flag: false, content: governance },
                { name: "tabPane5", label: "重点防汛部位及抢险措施", flag: false, content: measures },
                { name: "tabPane6", label: "防汛预案", flag: false, content: plan },
                { name: "tabPane7", label: "防汛信息统计", flag: false, content: statisticalInfo }
            ],
        }
    },
    created () {
        
    },
    methods: {
    }
};
</script>
<style lang="less" scoped>
.dialogForm .el-select {
    width: 100%;
}
.el-form-item {
    margin-left: 5px;
}
</style>
