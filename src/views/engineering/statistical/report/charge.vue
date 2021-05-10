<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="4">
                <leftTree @treeData="getTreeData"></leftTree>
            </el-col>
            <el-col :span="20">
                <el-table :data="tableData" stripe style="width:100%;margin-top: 10px">
                    <el-table-column prop="chargeType" label="类型" align="center"></el-table-column>
                    <el-table-column prop="chargeNum" label="工程处数" align="center"></el-table-column>
                    <el-table-column prop="totalArea" label="工程面积(平方米)" align="center"></el-table-column>
                    <el-table-column prop="rates" label="平均收费标准(元/平方米)" align="center"></el-table-column>
                    <el-table-column prop="totalMoney" label="收费金额(万元)" align="center"></el-table-column>
                </el-table>
                <div class="all-block-pager">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { chargeList } from '@/api/engineering/system/public'
import leftTree from '../../security/controlManagement/statisticalInfo/leftTree'

export default {
    components: {
        leftTree
    },
    watch: {
        'queryInfo.county': function (newVal) {
            this.queryInfo.county = newVal
            this.getTableDataList()
        }
    },
    data () {
        return {
            data: [],
            queryInfo: { // 分页
                pageSize: 10,
                pageNum: 1,
                county: ""
            },
            tableData: [],//数据
            total: 0,//分页总数
            rowData: [],
            defaultProps: { //el-tree 树结构默认渲染的字段
                children: 'children',
                label: "name"
            },
            renderContent: function (h, { node, data, store }) {
                let addElement = arguments[0];
                return addElement('span', [
                    addElement('i', { class: "el-icon-document" }),
                    addElement('span', " "),
                    addElement('span', arguments[1].node.label)
                ]);
            },
            contentStyleObj: {
                height: ""
            }
        }
    },
    created () {
        this.getTableDataList()
    },
    methods: {
        getTableDataList () { // 题库维护列表
            chargeList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        search () {
            this.queryInfo.pageNum = 1
            this.getTableDataList()
        },
        add () { // 添加
            this.status = "add"
            this.title = "新增"
            this.form = {
                name: "",
                unit: "",
            }
            this.dialogFormVisible = true
        },
        edit () { //  修改
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.status = "edit"
                this.title = "修改"
                this.form = {
                    name: this.rowData[0].name,
                    unit: this.rowData[0].unit
                }
                this.dialogFormVisible = true
            }
        },
        del () { // 题库列表删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {
                        riskDel(this.rowData[0].rasId).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    }
                }).catch(e => e)
            }
        },
        getTreeData (data) {
            this.queryInfo.county = data.label
        },
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        closeDialog () {
            this.dialogFormVisible = false
        },
        //点击分页
        handleCurrentChange (newPage) {  //分页当前页
            this.queryInfo.pageNum = newPage
            this.getTableDataList()
        },
        handleSizeChange (newSize) {   //分页每页显示条数
            this.queryInfo.pageSize = newSize
            this.getTableDataList()
        },
    }
};
</script>
<style lang="scss" scoped>
.clientHeight {
    border: 1px solid #95b8e7;
}
</style>
