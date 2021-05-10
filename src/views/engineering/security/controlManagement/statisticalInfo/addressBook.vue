<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="4">
                <leftTree @treeData="getTreeData"></leftTree>
            </el-col>
            <el-col :span="20">
                <el-table border v-show="isShowTable" :data="tableData" style="width:100%;margin-top: 10px" :span-method="arraySpanMethod" :cell-class-name="rowClass" :header-cell-style="{background:'#f0f0f0'}">
                    <!-- <el-table-column prop="fRole" label="名称" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div v-if="scope.row.fRole == '1'">指挥</div>
                            <div v-if="scope.row.fRole == '2'">常副指挥</div>
                            <div v-if="scope.row.fRole == '3'">副指挥</div>
                            <div v-if="scope.row.fRole == '4'">成员</div>
                            <div v-if="scope.row.fRole == '5'">办公室主任</div>
                            <div v-if="scope.row.fRole == '6'">副主任</div>
                            <div v-if="scope.row.fRole == '7'">联系人</div>
                        </template>
                    </el-table-column> -->
                    <el-table-column v-for="(item,index) in tableHeader" :key="index" :prop="item.prop" :label="item.label" align="center">
                    </el-table-column>
                </el-table>

                <el-table border :data="tableData" style="width:100%;margin-top: 10px" v-show="!isShowTable">
                    <el-table-column prop="fRole" label="名称" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div v-if="scope.row.fRole == '1'">指挥</div>
                            <div v-if="scope.row.fRole == '2'">常副指挥</div>
                            <div v-if="scope.row.fRole == '3'">副指挥</div>
                            <div v-if="scope.row.fRole == '4'">成员</div>
                            <div v-if="scope.row.fRole == '5'">办公室主任</div>
                            <div v-if="scope.row.fRole == '6'">副主任</div>
                            <div v-if="scope.row.fRole == '7'">联系人</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="monicker" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="duty" label="职务" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="offPhone" label="办公电话" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="handset" label="手机电话" align="center"></el-table-column>
                    <el-table-column prop="telephone" label="值班电话" align="center"></el-table-column>
                    <el-table-column prop="fax" label="传真" align="center"></el-table-column>
                    <el-table-column prop="address" label="地址" align="center"></el-table-column>
                    <el-table-column prop="postcode" label="邮编" align="center"></el-table-column>
                    <el-table-column prop="email" label="电子信箱" align="center"></el-table-column>
                </el-table>
            </el-col>
        </el-row>

    </div>
</template>


<script>
import { addressBookList } from "@/api/engineering/security/controlManagement"

import leftTree from './leftTree'

export default {
    components: {
        leftTree
    },
    watch: {
        'divisions': function (newVal) {
            this.divisions = newVal
            if (newVal == '全市') {
                this.isShowTable = false
                this.getTableDataList("")
            } else {
                this.isShowTable = true
                this.getTableDataList(newVal)
            }
        }
    },
    data () {
        return {
            tableData: [],
            divisions: '',
            tableHeader: [
                { label: '名称', prop: 'name' },
                { label: '姓名', prop: 'monicker' },
                { label: '职务', prop: 'duty' },
                { label: '办公电话', prop: 'offPhone' },
                { label: '手机电话', prop: 'handset' }
            ],
            isShowTable: false
        }
    },
    created () {
        this.getTableDataList(this.divisions)
    },
    mounted () {
    },
    methods: {
        getTableDataList (divisions) {
            this.tableData = []
            addressBookList(divisions).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                    if (this.divisions != "全市" && this.divisions != "") {
                        let data = res.rows
                        data.forEach(item => {
                            item.name = item.fRole
                            switch (item.name) {
                                case "1":
                                    item.name = '指挥'
                                    break
                                case "2":
                                    item.name = '常副指挥'
                                    break
                                case "3":
                                    item.name = '副指挥'
                                    break
                                case "4":
                                    item.name = '成员'
                                    break
                                case "5":
                                    item.name = '办公室主任'
                                    break
                                case "6":
                                    item.name = '副主任'
                                    break
                                case "7":
                                    item.name = '联系人'
                                    break
                            }
                        })
                        if (this.tableData.length != 0) {
                            this.tableData.push(
                                { name: "值班电话", monicker: data[0].telephone, offPhone: "传真", handset: data[0].fax },
                                { name: "地址", monicker: data[0].address, offPhone: "邮编", handset: data[0].postcode },
                                { name: "电子信箱", monicker: data[0].email },
                            )
                        }
                    }
                }
            })
        },
        getTreeData (data) {  // 获取子组件传递过来的数据
            this.divisions = data.label
        },
        rowClass ({ row, column, rowIndex, columnIndex }) {  // 改变表格表头的颜色
            if (rowIndex == this.tableData.length - 1) {
                if (columnIndex === 0) {
                    return 'bacColorf0f0f0'
                }
            }
            if (rowIndex == this.tableData.length - 2 || rowIndex == this.tableData.length - 3) {
                if (columnIndex === 0 || columnIndex === 3) {
                    return 'bacColorf0f0f0'
                }
            }
        },
        arraySpanMethod ({ row, column, rowIndex, columnIndex }) { // 表格合并行
            if (rowIndex == this.tableData.length - 1) {
                if (columnIndex === 1) {
                    return [1, 4];
                } else if (columnIndex === 2) {
                    return [0, 0]
                }
            }
            if (rowIndex == this.tableData.length - 2) {
                if (columnIndex === 1) {
                    return [1, 2];
                } else if (columnIndex === 2) {
                    return [0, 0]
                }
            }
            if (rowIndex == this.tableData.length - 3) {
                if (columnIndex === 1) {
                    return [1, 2];
                } else if (columnIndex === 2) {
                    return [0, 0]
                }
            }
        },

    },
}
</script>


<style lang='scss' scoped>
.rgb196 {
    background: rgb(196, 196, 196);
}
.bacColor317eb0 {
    background: #317eb0;
}
::v-deep .bacColorf0f0f0 {
    background: #f0f0f0 !important;
    color: black !important;
}
</style>
