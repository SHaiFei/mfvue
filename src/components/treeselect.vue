<template>
    <treeselect :options="optionsDepartment" placeholder="请选择部门" :normalizer="normalizer" v-model="department" class="treeselect" />
</template>


<script>
import { deptList } from '@/api/examination/selftest'

import treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
    components: {
        treeselect
    },
    data () {
        return {
            normalizer (node) {
                //去掉children=null的属性
                if (node.children == null || node.children == 'null') {
                    delete node.children;
                }
            },
            department: null,
            optionsDepartment: [],
        }
    },
    created () {
        this.getOptionsDepartment()
    },
    mounted () {

    },
    methods: {
        getOptionsDepartment () { // 获取部门数据
            deptList().then(res => {
                if (res.code == 200) {
                    this.optionsDepartment = res.data
                } else {
                    this.msgError(res.msg)
                }
            })
        },
    },
}
</script>


<style lang='scss' scoped>
.treeselect {
    width: 200px;
    display: inline-block;
    top: 13px;
}
::v-deep .vue-treeselect__input-container {
    height: 29px !important;
}
::v-deep .vue-treeselect__control {
    height: 35px !important;
    line-height: 160px !important;
}
</style>
