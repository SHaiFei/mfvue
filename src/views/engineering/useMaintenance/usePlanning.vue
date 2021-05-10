<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>使用管理</el-breadcrumb-item>
            <el-breadcrumb-item>使用规划</el-breadcrumb-item>
        </el-breadcrumb>
        <tab-pane :paneList="paneList"></tab-pane>
    </div>
</template>

<script>
import disableMaintenance from "./usePlanning/disableMaintenance"
import useMaintenance from "./usePlanning/useMaintenance"
import usePlanning from "./usePlanning/usePlanning"
import useManagement from "./usePlanning/useManagement"

import TabPane from '@/components/tabPane'

export default {
    components: {
        TabPane, useManagement, disableMaintenance, useMaintenance, usePlanning
    },
    data () {
        return {
            paneList: [ // tab页签 数据
                { name: "tabPane1", label: "规划方案管理", flag: true, content: useManagement },
                { name: "tabPane2", label: "使用规划", flag: false, content: usePlanning },
                { name: "tabPane3", label: "可用项维护", flag: false, content: useMaintenance },
                { name: "tabPane4", label: "禁用项维护", flag: false, content: disableMaintenance }
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
</style>
