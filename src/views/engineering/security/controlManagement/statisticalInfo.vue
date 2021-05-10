<template>
    <tab-pane :paneList="paneList" style="height: 100%"></tab-pane>
</template>

<script>
import addressBook from './statisticalInfo/addressBook'
import supplies from './statisticalInfo/supplies'
import team from './statisticalInfo/team'
import measures from './statisticalInfo/measures'


import TabPane from '@/components/tabPane'
export default {
    components: {
        TabPane, addressBook, supplies, team, measures
    },
    data () {
        return {
            paneList: [ // tab页签 数据
                { name: "tabPane1", label: "防汛通讯录", flag: true, content: addressBook },
                { name: "tabPane2", label: "迎汛抢险队伍统计", flag: false, content: team },
                { name: "tabPane3", label: "迎汛物资储备统计", flag: false, content: supplies },
                { name: "tabPane4", label: "重点防汛部位及抢险措施统计", flag: false, content: measures },
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
