<template>
    <div>
        <span class="textSpan">所属区</span>
        <el-tree :data="data" :treeData="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</template>


<script>
import { getArea } from '@/api/menu'
export default {
    data () {
        return {
            data: [],
            treeData: '',
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    created () {
        this.getArea()
    },
    mounted () {

    },
    methods: {
        getArea () {
            getArea().then(res => {
                if (res.code === 200) {
                    this.data.push({label: '全市'})
                    res.data.forEach((item, index) => {
                        let params = {}
                        params.label = item
                        params.id = index
                        this.data.push(params)
                    })
                }
            })
        },
        handleNodeClick (data) {
            this.$emit('treeData', data)
        }
    },
}
</script>


<style lang='scss' scoped>
.textSpan {
    height: 30px;
    line-height: 30px;
}
.el-tree {
    width: 100%;
    // background-color: gold;
    border: 1px solid #999;
    height: 100% ;
}
</style>
