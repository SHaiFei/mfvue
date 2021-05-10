<template>
    <div>
        <el-table :data="tableData" stripe style="width:100%;margin-top: 10px">
            <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
            <el-table-column prop="underCode" label="工程编号" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="underName" label="工程名称" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer" style="text-align: right">
            <el-button @click="close">取 消</el-button>
        </div>
    </div>
</template>

<script>
import { enginTableList } from "@/api/engineering/spotcheck"

export default {
    props: ['ssjrwId'],
    data () {
        return {
            tableData: [],
        }
    },
    created () {
        let params = {
            ssjrwId: this.ssjrwId
        }
        this.getEngin(params)
    },
    methods: {
        getEngin (params) {
            enginTableList(params).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                }
            })
        },
        close () {
            // this.$parent.$parent.dialogFormVisible = false
            this.$emit("closeDialog")
        }
    },
}
</script>


<style lang='scss' scoped>
.el-date-editor {
    width: 100%;
}
.dialog-footer {
    margin-top: 20px;
}
</style>
