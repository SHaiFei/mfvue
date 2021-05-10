<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>基本信息</el-breadcrumb-item>
            <el-breadcrumb-item>帮助中心</el-breadcrumb-item>
            <el-breadcrumb-item>资料下载</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-table :data="tableData" stripe style="width:100%;" border :span-method="arraySpanMethod">
                <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
                <el-table-column prop="file" label="下载文件" align="center" width="500">
                    <template slot-scope="scope">
                        <div v-if="scope.row.id" style="text-align: left">
                            <span> {{ scope.row.file }}</span>
                        </div>
                        <div v-else>
                            <a href=""> {{ scope.row.file }}</a>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="explain" label="说明" align="left"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [],//数据
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            this.axios.get("../../../../js/file.json").then(res => {
                this.tableData = res.data.data
            })
        },
        arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0 || rowIndex == 7) {
                if (columnIndex === 1) {
                    return [1, 2]
                } else if (columnIndex === 2 || columnIndex === 3) {
                    return [0, 0]
                }
            } else {
                return [1, 1]
            }
        },
    }
};
</script>
<style lang="scss" scoped>
a {
    text-decoration: underline;
    color: blue;
}
</style>
