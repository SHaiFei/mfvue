<template>
    <div>
        <el-table :data="tableData" style="width: 100%" >
            <el-table-column v-for="(item, index) in listLabel" :key="index" :prop="item.prop" :label="item.label" align="center">
            </el-table-column>
        </el-table>
    </div>
</template>


<script>
export default {
    props: {
        tableData: {
            type: Array,
            default: () => {
                return []
            }
        },
        listLabel: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data () {
        return {

        }
    },
    created () {

    },
    mounted () {

    },
    methods: {
        // 表格头部样式
        headerClass () {
            return 'table-header-class'
        },
        // element列表文字居中
        cellStyle () {
            return 'text-align:center;line-height: 8px;'
        },
    },
}
</script>


<style lang='scss' scoped>
</style>
