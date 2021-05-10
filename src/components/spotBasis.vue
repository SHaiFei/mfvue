<template>
    <el-select v-model="spotBasisVal">
        <el-option v-for="item in spotBasisArr" :key="item.id" :value="item.id" :label="item.label"></el-option>
    </el-select>
</template>


<script>
export default {
    data () {
        return {
            spotBasisVal: "",
            spotBasisArr: [
                { id: 1, label: '权利清单' },
                { id: 2, label: '内部检测' }
            ]
        }
    },
    created () {

    },
    mounted () {

    },
    methods: {

    },
}
</script>


<style lang='scss' scoped>
</style>
