<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>物资仓储</el-breadcrumb-item>
            <el-breadcrumb-item>基本信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>仓库基本信息管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-table :data="tableData" style="width:100%;margin-top: 10px" border :show-header="false" :span-method="arraySpanMethod" :row-style="{height: '50px'}" :cell-style="cellStyle">
                <el-table-column prop="data1" align="right" width="200"></el-table-column>
                <el-table-column prop="data2" align="left"></el-table-column>
                <el-table-column prop="data3" align="right" width="200"></el-table-column>
                <el-table-column prop="data4" align="left">
                    <template slot-scope="scoped">
                        <div class="details" v-if="scoped.row.data4 == '详细信息'" @click="queryinfo(scoped.row)">详细信息</div>
                        <div v-else @click="queryinfo(scoped.row)">{{ scoped.row.data4 }}</div>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: center;width: 100%;margin-top: 20px">
                <el-button type="primary" size="small" @click="back">返 回</el-button>
            </div>
        </div>

    </div>
</template>

<script>
import { getWarhouseInfo } from '@/api/supplies/warehouse'
export default {
    data () {
        return {
            id: "",
            tableData: []
        };
    },
    created () {
        this.id = this.$route.query.id
        this.getTableDataList();
    },
    methods: {
        getTableDataList () { // 获取列表数据
            getWarhouseInfo(this.id).then(res => {
                if (res.code == 200) {
                    let project, elevator, state = ""
                    if (res.data.project == 1) {
                        project = "是"
                    } else {
                        project = "不是"
                    }
                    if (res.data.elevator == 1) {
                        elevator = "有"
                    } else {
                        elevator = "无"
                    }
                    if (res.data.state == 1) {
                        state = "在用"
                    } else {
                        state = "维修"
                    }
                    this.tableData.push(
                        { data1: "物资库名称", data2: res.data.name, data3: "建筑面积", data4: res.data.buildingArea },
                        { data1: "联系电话", data2: res.data.telphone, data3: "楼层", data4: res.data.floors },
                        { data1: "经度", data2: res.data.precision, data3: "纬度", data4: res.data.dimension },
                        { data1: "人防工程名称", data2: res.data.projectname, data3: "是否是人防工程", data4: project },
                        { data1: "地址", data2: res.data.address, data3: "物资库负责人", data4: res.data.fzrId },
                        { data1: "负责人领导", data2: res.data.leaderId, data3: "电梯", data4: elevator },
                        { data1: "仓库状态", data2: state },
                    )
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        back () { // 返回
            this.$router.go(-1)
        },
        arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 11) {
                if (columnIndex === 1) {
                    return [1, 3]
                } else if (columnIndex === 2 || columnIndex === 3) {
                    return [0, 0]
                }
            } else {
                return [1, 1]
            }
        },
        cellStyle ({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0 || columnIndex === 2) { //指定坐标
                // return 'background: #e0ecff'
            } else {
                return ''
            }
        },
    },
};
</script>
<style lang="less" scoped>
.el-dialog-div {
    height: 60vh;
    overflow: auto;
}
.el-table {
    margin-top: 10px;
}
</style>
