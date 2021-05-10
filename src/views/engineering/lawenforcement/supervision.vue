<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>工程管理</el-breadcrumb-item>
            <el-breadcrumb-item>行政执法</el-breadcrumb-item>
            <el-breadcrumb-item>监督检查</el-breadcrumb-item>
        </el-breadcrumb>
        <tab-pane :paneList="paneList"></tab-pane>
    </div>
</template>

<script>
import securityCheck from './supervision/securityCheck'
import maintenanceCheck from './supervision/maintenanceCheck'
import specialCheck from './supervision/specialCheck'

import TabPane from '@/components/tabPane'

export default {
    components: {
        securityCheck, maintenanceCheck, specialCheck, TabPane
    },
    data () {
        return {
            paneList: [
                { name: "tabPane1", label: "安全检查", flag: true, content: securityCheck },
                { name: "tabPane2", label: "维护管理检查", flag: false, content: maintenanceCheck },
                { name: "tabPane3", label: "专项检查", flag: false, content: specialCheck },
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
