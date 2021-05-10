<template>
    <div class="all-data-detail">
        <tab-pane :paneList="paneList"></tab-pane>
    </div>
</template>

<script>
import basement from "./report/basement"
import charge from "./report/charge"
import engineering from "./report/engineering"
import utilization from "./report/utilization"

import TabPane from '@/components/tabPane'

export default {
    components: {
        TabPane, basement, charge, engineering, utilization
    },
    data () {
        return {
            paneList: [
                { name: "tabPane1", label: "在用人防工程统计", flag: true, content: engineering },
                { name: "tabPane2", label: "防空地下室综合统计", flag: false, content: basement },
                { name: "tabPane3", label: "汽车库利用率统计", flag: false, content: utilization },
                { name: "tabPane4", label: "收费工程统计", flag: false, content: charge }
            ]
        }
    }
};
</script>
<style lang="scss" scoped>
.dialogForm .el-select {
    width: 100%;
}
.el-form-item {
    margin-left: 5px;
}
</style>
