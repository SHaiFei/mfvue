<template>
    <!-- 消防管理 -->
    <div class="all-data-detail">
        <tab-pane :paneList="paneList"></tab-pane>
    </div>
</template>

<script>

import archivingData from "./fireControl/archivingData"
import governance from "./fireControl/governance"

import TabPane from '@/components/tabPane'

export default {
    components: {
        archivingData, governance, TabPane
    },
    data () {
        return {
            paneList: [ // tab页签 数据
                { name: "tabPane1", label: "资料归档", flag: true, content: archivingData },
                { name: "tabPane2", label: "隐患排查治理", flag: false, content: governance }
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
