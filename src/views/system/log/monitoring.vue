<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>系统监控</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin: 0">
            <el-row>
                <div class="btn">
                    <el-button size="small" type="primary" @click="refresh">刷新</el-button>
                    <el-button size="small" type="primary" @click="startOfStop">{{ isStop }}</el-button>
                </div>
            </el-row>
            <el-row :gutter="24" style="margin: 15px 0;">
                <el-col :span="12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>CPU</span>
                        </div>
                        <div>
                            <el-table :data="cpuTableData" style="width: 100%;" ref="multipleTable">
                                <el-table-column prop="label" label="属性" align="left"></el-table-column>
                                <el-table-column prop="prop" label="值" align="left"></el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>内存</span>
                        </div>
                        <div>
                            <el-table :data="menTableData" style="width: 100%;" ref="multipleTable">
                                <el-table-column prop="label" label="属性" align="left"></el-table-column>
                                <el-table-column prop="prop" label="内存" align="left"></el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-table stripe :data="monitoringData" style="width: 100%;" ref="multipleTable">
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column prop="dirName" label="盘符路径" align="center"></el-table-column>
                <el-table-column prop="sysTypeName" label="文件系统" align="center"></el-table-column>
                <el-table-column prop="typeName" label="盘符类型" align="center"></el-table-column>
                <el-table-column prop="total" label="总大小" align="center"></el-table-column>
                <el-table-column prop="free" label="可用大小" align="center"></el-table-column>
                <el-table-column prop="used" label="已用大小" align="center"></el-table-column>
                <el-table-column prop="usage" label="已用百分比" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.usage}}%</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>


<script>
import { monitoringList, startOfStop } from "@/api/system/operationlog"
export default {
    data () {
        return {
            monitoringData: [],
            cpuTableData: [],
            menTableData: [],
            isStop: "启动"
        }
    },
    created () {
        this.getMonitoringList()
    },
    mounted () {
    },
    methods: {
        getMonitoringList () {
            monitoringList().then(res => {
                if (res.code == 200) {
                    this.monitoringData = res.data.sysFiles
                    // 内存数据
                    this.menTableData = [
                        { prop: res.data.men.total, label: "总内存" },
                        { prop: res.data.men.used, label: "已用内存" },
                        { prop: res.data.men.free, label: "剩余内存" },
                        { prop: res.data.men.usage, label: "使用率" },
                    ]
                    // cpu 数据
                    this.cpuTableData = [
                        { prop: res.data.cpu.cpuNum, label: "核心数" },
                        { prop: res.data.cpu.used, label: "用户使用率" },
                        { prop: res.data.cpu.sys, label: "系统使用率" },
                        { prop: res.data.cpu.free, label: "当前空闲率" },
                    ]
                }
            })
        },
        refresh(){ // 刷新
            this.getMonitoringList()
        },
        startOfStop(){ // 启用停止
            let params = {}
            if (this.isStop == "启动"){
                this.isStop = "停止"
                params.tf = false
            } else {
                this.isStop = "启动"
                params.tf = true
            }
            startOfStop(params).then(res => {})
        }
    },
}
</script>


<style lang='scss' scoped>
.clearfix {
    font-size: 18px;
}
::v-deep .el-talbe {
    border-top: none !important;
}
.btn {
    margin: 10px 20px 0 0;
    flex: 1;
    text-align: right;
}
</style>
