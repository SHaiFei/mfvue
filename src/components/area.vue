<template>
    <el-select v-model="areaVal" clearable>
        <el-option v-for="(item, index) in areaArr" :key="index" :value="item" :label="item"></el-option>
    </el-select>
</template>


<script>
import { getArea } from '@/api/menu'
export default {
    data() {
        return {
            areaVal: "",
            areaArr: []
        }
    },
    created(){
        this.getArea()
    },
    mounted(){
        
    },
    methods: {
        getArea(){
            getArea().then( res => {
                if (res.code === 200){
                    this.areaArr = res.data
                }
            })
        }
    },
}
</script>


<style lang='scss' scoped>


</style>
