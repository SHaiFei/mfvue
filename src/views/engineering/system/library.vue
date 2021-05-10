<template>
    <div class="all-data-detail">
        <tab-pane :paneList="paneList"></tab-pane>
    </div>
</template>

<script>
import maintenance from "./library/maintenance"
import security from "./library/security"
import special from "./library/special"

import TabPane from '@/components/tabPane'

export default {
    components: {
        TabPane, maintenance, security, special
    },
    data () {
        return {
            paneList: [ // tab页签 数据
                { name: "tabPane1", label: "安全检查事项维护", flag: true, content: security },
                { name: "tabPane2", label: "维护管理检查事项维护", flag: false, content: maintenance },
                { name: "tabPane3", label: "专项检查事项维护", flag: false, content: special }
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
