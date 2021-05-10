<template>
    <div>
        <el-tabs type="border-card" style="height: 100%" @tab-click="changeTab" v-model="activeName">
            <el-tab-pane v-for="(item, index) in paneList" :name="item.name" :label="item.label" :key="item.name">
                <div :is="item.content" v-if="item.flag"></div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script>
export default {
    // props: ["paneList"],
    props: {
        paneList: {
            type: Array
        }
    },
    data () {
        return {
            activeName: ""
        }
    },
    created () {
        this.activeName = this.paneList[0].name
    },
    mounted () {

    },
    methods: {
        changeTab (tab,) { //  tab 切换
            let arr = this.paneList
            for (var i = 0; i < arr.length; i++) {
                if (tab.name === arr[i].name) {
                    arr[i].flag = true
                } else {
                    arr[i].flag = false
                }
            }
        },
    },
}
</script>


<style lang='scss' scoped>
#pane-tabPane1 {
    display: block;
}
// ::v-deep .el-tabs--border-card > .el-tabs__header {
//     background-color: #f5f7fa;
//     border: 1px solid #e4e7ed !important;
//     margin: 0;
// }
</style>
