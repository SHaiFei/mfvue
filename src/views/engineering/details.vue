<template>
    <div class="all-data-detail">
        <!-- <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>在线考试</el-breadcrumb-item>
            <el-breadcrumb-item>考试管理</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!-- <div class="all-titles">详情</div> -->
        <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="竣工验收备案申请表" name="project1">
                <el-table :data="tableData1" style="width:100%;margin-top: 10px" border :show-header="false" :span-method="arraySpanMethod1" :row-style="{height: '50px'}" :cell-style="cellStyle">
                    <el-table-column prop="data1" align="right" width="200"></el-table-column>
                    <el-table-column prop="data2" align="left"></el-table-column>
                    <el-table-column prop="data3" align="right" width="200"></el-table-column>
                    <el-table-column prop="data4" align="left"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="单位信息" name="project2">
                <el-table :data="tableData2" style="width:100%;margin-top: 10px" border :span-method="arraySpanMethod2" :row-style="{height: '50px'}" :cell-style="cellStyle">
                    <el-table-column prop="data1" label="单位名称" align="center"></el-table-column>
                    <el-table-column prop="data2" label="法定代表人及联系电话" align="left"></el-table-column>
                    <el-table-column prop="data3" label="项目负责人及联系电话" align="left"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="统计表" name="project3">
                <el-table :data="tableData3" style="width:100%;margin-top: 10px" border :show-header="false" :span-method="arraySpanMethod3" :row-style="{height: '50px'}" :cell-style="cellStyle">
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
            </el-tab-pane>
            <div  class="all-block-pager"><el-button type="primary" size="small" @click="back">返回</el-button></div>
        </el-tabs>
        <el-dialog title="详细信息" :visible.sync="dialogFormVisible" width="60%" v-if="dialogFormVisible" :close-on-click-modal="false" class="dialogForm">
            <el-table :data="tableData" style="width:100%" border>
                <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                <el-table-column prop="BIG_TYPE" label="大类设备" align="center"></el-table-column>
                <el-table-column prop="SN" label="设备名称" align="center"></el-table-column>
                <el-table-column prop="PRODUCT_MODEL" label="设备型号" align="center"></el-table-column>
                <el-table-column prop="QUANTITY" label="数量" align="center"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { projectList, projectList2, projectList3, getDataList } from '@/api/examination/engineering'

export default {
    watch: {
        'activeName': function (val) { //监听切换状态-计划单
            if (val == 'project2') {
                this.projectList2()
            }
            if (val == 'project3') {
                this.projectList3()
            }
            if (val == 'project1') {
                this.projectList1()
            }
        },
    },
    data () {
        return {
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1
            },
            tableData: [],
            tableData1: [],
            tableData2: [],
            tableData3: [],
            dialogFormVisible: false,//增加弹窗
            activeName: "project1",
            total: 0
        }

    },
    created () {
        // this.projectList3() // 列表
        this.projectList1() // 列表
    },
    mounted () {
    },
    methods: {
        queryinfo (val) {
            getDataList({ DYID: val.dyId }).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data
                    this.total = res.total //总页数
                } else {
                    this.msgError(res.msg)
                }
            })
            this.dialogFormVisible = true
        },
        projectList1 () { // 列表
            let projectId = {
                PROJECTID: this.$route.query.id
            }
            this.tableData1 = []
            projectList(projectId).then(res => {
                if (res.code == 200) {
                    this.tableData1.push(
                        { data1: "项目名称", data2: res.data.PROJECTNAME, data3: "监督报告编号", data4: res.data.JDBGBH },
                        { data1: "建设单位名称", data2: res.data.COMPANY1, data3: "所属街道", data4: res.data.STREET_NAME },
                        { data1: "联系人", data2: res.data.COMPRNY1LXR, data3: "固定电话", data4: res.data.COMPRNY1DH },
                        { data1: "施工单位名称", data2: res.data.COMPANY2, data3: "施工单位联系人", data4: res.data.COMPANY2lxr },
                        { data1: "联系人", data2: res.data.COMPANY2LXR, data3: "固定电话", data4: res.data.COMPANY2DH },
                        { data1: "建设地址", data2: res.data.ADDRESS, data3: "结构形式", data4: res.data.STRUCTURE },
                    )
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        projectList2 () {  //   单位信息
            this.tableData2 = []
            projectList2({ PROJECTID: this.$route.query.id, TYPE: this.$route.query.type }).then(res => {
                if (res.code == 200) {
                    this.tableData2.push({
                        data1: res.data.company1,
                        data2: res.data.comprny1fr,
                        data3: res.data.comprny1lxr
                    }, {
                        data1: res.data.company1,
                        data2: res.data.comprny1frdh,
                        data3: res.data.comprny1dh
                    }, {
                        data1: res.data.company3,
                        data2: res.data.comprny3fr,
                        data3: res.data.comprny3lxr
                    }, {
                        data1: res.data.company3,
                        data2: res.data.comprny3frdh,
                        data3: res.data.comprny3dh
                    }, {
                        data1: res.data.company4,
                        data2: res.data.comprny4fr,
                        data3: res.data.comprny4lxr
                    }, {
                        data1: res.data.company4,
                        data2: res.data.comprny4frdh,
                        data3: res.data.comprny4dh
                    }, {
                        data1: res.data.company2,
                        data2: res.data.comprny2fr,
                        data3: res.data.comprny2lxr
                    }, {
                        data1: res.data.company2,
                        data2: res.data.comprny2frdh,
                        data3: res.data.comprny2dh
                    })
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        projectList3 () {  // 页签3 数据
            this.tableData3 = []
            projectList3({ PROJECTID: this.$route.query.id }).then(res => {
                if (res.code == 200) {
                    this.tableData3.push(
                        { data1: "总建筑面积", data2: res.data.ZONGMJ, data3: "工程类别", data4: res.data.GCLB },
                        { data1: "人防工程编号", data2: res.data.GCBH, data3: "角度坐标", data4: res.data.JDZB },
                        { data1: "人防建筑面积(㎡)", data2: res.data.JZMJ, data3: "结构形式", data4: res.data.JGXS },
                        { data1: "通道面积(㎡)", data2: res.data.TDMJ, data3: "用房面积(㎡)", data4: res.data.GLYFMJ },
                        { data1: "平时用途", data2: res.data.PEACE_USE, data3: "战时功能", data4: res.data.ZSGN },
                        { data1: "抗力等级", data2: res.data.KLDJ, data3: "防化等级", data4: res.data.FHDJ },
                        { data1: "开工时间", data2: res.data.KGSJ, data3: "验收时间", data4: res.data.YSSJ },
                        { data1: "地下层数", data2: res.data.DXCS, data3: "地上层数", data4: res.data.DSCS },
                        { data1: "人防所在层", data2: res.data.RFSZC, data3: "报警器位置", data4: res.data.BJQWZ },
                        { data1: "防护单元数量", data2: res.data.DYSL, data3: "高点监控位置", data4: res.data.JKWZ },
                        { data1: "工程内车位数", data2: res.data.GCNCWS, data3: "通知单号", data4: res.data.TZDH },
                        { data1: "工程地址", data2: res.data.ADDRESS, data3: "防化等级", data4: res.data.FHDJ },
                    )
                    res.data.DY.forEach(item => {
                        this.tableData3.push(
                            { data1: "防护单元编号", data2: item.FHDYBH, data3: "现场核查内容情况", data4: "详细信息", dyId: item.DYID, projectId: item.PROJECTID }
                        )
                    })
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        arraySpanMethod1 ({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 3) {
                if (columnIndex === 1) {
                    return [1, 3]
                } else if (columnIndex === 2 || columnIndex === 3) {
                    return [0, 0]
                }
            } else {
                return [1, 1]
            }
        },
        arraySpanMethod2 ({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex % 2 == 0) {
                    return [2, 1];
                } else {
                    return [0, 0];
                }
            } else {
                return [1, 1]
            }
        },
        arraySpanMethod3 ({ row, column, rowIndex, columnIndex }) {
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
        back () { //返回上一层
            this.$router.go(-1)
        },
        //点击分页
        handleCurrentChange (newPage) {  //分页当前页
            // this.queryInfo.pageNum = newPage
            // this.getTableDataList()
        },
        handleSizeChange (newSize) {   //分页每页显示条数
            // this.queryInfo.pageSize = newSize
            // this.getTableDataList()
        },
    }
};
</script>
<style lang="less" scoped>
/deep/ .el-dialog .el-dialog__body {
    height: 550px !important;
    overflow-y: auto !important;
}
.dialogForm .el-select {
    width: 100%;
}
.el-form-item {
    margin-left: 5px;
}
.details {
    color: blue;
    cursor: pointer;
}
</style>
