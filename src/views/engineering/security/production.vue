<template>
    <div class="all-data-detail">
        <tab-pane :paneList="paneList"></tab-pane>
    </div>
</template>

<script>
import Target from "./production/target"
import archivingData from "./production/archivingData"
import governance from "./production/governance"
import production from "./production/production"

import TabPane from '@/components/tabPane'

export default {
    components: {
        Target, archivingData, governance, production, TabPane
    },
    data () {
        return {
            paneList: [ // tab页签 数据
                { name: "tabPane1", label: "目标责任书", flag: true, content: Target },
                { name: "tabPane2", label: "资料归档", flag: false, content: archivingData },
                { name: "tabPane3", label: "隐患排查治理", flag: false, content: governance },
                { name: "tabPane4", label: "安全生产评定", flag: false, content: production }
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
