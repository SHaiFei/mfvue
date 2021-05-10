<template>
    <el-select v-model="departmentVal" >
        <el-option v-for="item in department" :key="item.id" :value="item.id" :label="item.label"></el-option>
    </el-select>
</template>


<script>
export default {
    data() {
        return {
            departmentVal: "",
            department:[
                { id: 1, label: '民防' },
                { id: 2, label: '消防' },
                { id: 3, label: '公安' },
                { id: 4, label: '卫生' }
            ]
        }
    },
    created(){

    },
    mounted(){

    },
    methods: {

    },
}
</script>


<style lang='scss' scoped>


</style>
