<template>
    <div class="all-data-detail">
        <el-breadcrumb separator="/" class="all-titles">
            <el-breadcrumb-item>在线学习</el-breadcrumb-item>
            <el-breadcrumb-item>{{ form.navigation }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ form.lawTypeChinese }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pageStyle">
            <el-row class="elRow">
                <div class="elRowLeft">
                    <span class="font-12 spanText">课目名称</span>
                    <el-input v-model="queryInfo.name" clearable class="elinput200"></el-input>
                    <span class="font-12 spanText">时间</span>
                    <el-date-picker v-model="queryInfo.yyyy" type="year" value-format="yyyy" class="elinput200" placeholder="选择年" clearable>
                    </el-date-picker>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search()">查询</el-button>
                </div>
            </el-row>
            <el-table stripe :data="tableData" style="width: 100%" @selection-change="tableDataSelect" @row-click="clickRow" ref="multipleTable">
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column prop="name" label="课目名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="subjecttypename" label="课目类型" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="majorname" label="专业名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="yyyy" label="时间" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <div class="preview" @click="clickRow(scope.row)">
                            查 看
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="all-block-pager">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>

            <!--  课件列表  -->
            <div v-if="courseware">
                <courseware :coursewareObj="coursewareObj"></courseware>
            </div>
        </div>

        <el-dialog title="查看" :visible.sync="dialogFormVisible" width="50%">
            <div class="el-dialog-div">
                <!-- pdf 文件 -->
                <!-- <pdf v-for="item in numPages" :key="item" ref="pdf" :src="src" :page="item" v-if="str == 'pdf'"></pdf> -->
                <!-- 视频文件 -->
                <!-- <video-player class="video-player vjs-custom-skin" ref="videoPlayer" v-if="str == 'mp4'" :playsinline="true" :options="playerOptions"> -->
                <!-- </video-player> -->
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { tableDataList } from "@/api/learning/regulations";
import courseware from '../examination/parameter/courseware'

export default {
    components: { courseware },
    data () {
        return {
            tableData: [],
            total: 0, //分页总数
            dialogFormVisible: false,
            form: {
                navigation: "法律法规",
                lawTypeChinese: "国家",
                publicYear: "",
                lawName: ""
            },
            queryInfo: {
                pageNum: 1,
                pageSize: 5,
                muluid: "",
                name: "",
                yyyy: ""
            },
            courseware: false,
            coursewareObj: {
                id: "",
                learning: ""
            },
        };
    },
    watch: {
        $route: {
            handler () {
                this.getRouteData()
                this.getTableDataList();
                this.courseware = false
                //深度监听，同时也可监听到param参数变化
            },
            deep: true,
        },
    },

    created () {
        this.getRouteData()
        this.getTableDataList();
    },
    mounted () { },
    methods: {
        getTableDataList () { // 获取列表数据
            tableDataList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows
                    this.total = res.total
                }
            })
        },
        getRouteData () {  // 设置面包屑文字以及列表id
            this.queryInfo.muluid = this.$route.params.status
            switch (this.queryInfo.muluid) { // 给接口不同id
                case "2":
                    this.form.lawTypeChinese = "国家";
                    break
                case "3":
                    this.form.lawTypeChinese = "北京市";
                    break
                case "4":
                    this.form.lawTypeChinese = "人防工程";
                    break
                case "5":
                    this.form.lawTypeChinese = "预案";
                    break
                case "7":
                    this.form.lawTypeChinese = "公共课程";
                    break
                case "8":
                    this.form.lawTypeChinese = "专业课程";
                    break
                case "9":
                    this.form.lawTypeChinese = "训练演练";
                    break
                case "11":
                    this.form.lawTypeChinese = "情况处置行动";
                    break
                case "12":
                    this.form.lawTypeChinese = "情报信息处理";
                    break
                case "13":
                    this.form.lawTypeChinese = "专题训练";
                    break
                case "15":
                    this.form.lawTypeChinese = "人防宣传";
                    break
                case "16":
                    this.form.lawTypeChinese = "学术沙龙";
                    break
                case "17":
                    this.form.lawTypeChinese = "调研结果";
                    break
            }
            if (this.queryInfo.muluid == "2" || this.queryInfo.muluid == "3" || this.queryInfo.muluid == "4" || this.queryInfo.muluid == "5") {
                this.form.navigation = "法律法规"
            } else if (this.queryInfo.muluid == "7" || this.queryInfo.muluid == "8" || this.queryInfo.muluid == "9") {
                this.form.navigation = "在线学习"
            } else if (this.queryInfo.muluid == "11" || this.queryInfo.muluid == "12" || this.queryInfo.muluid == "13") {
                this.form.navigation = "战时工作"
            } else if (this.queryInfo.muluid == "15" || this.queryInfo.muluid == "16" || this.queryInfo.muluid == "17") {
                this.form.navigation = "知识集锦"
            }
        },

        proveiew (row) { // 查看内容
            this.src == ""
            let index = row.httpurl.lastIndexOf(".")
            this.str = row.httpurl.substring(index + 1)
            if (this.str == "pdf") {
                this.src = pdf.createLoadingTask(row.httpurl);
                this.src.promise.then((pdf) => {
                    this.numPages = pdf.numPages;
                });
            } else if (this.str == "mp4") {
                this.playerOptions.sources[0].src = row.httpurl
            }
            this.dialog = true;
        },
        clickRow (row, column, event) { //点击行
            console.log(row);
            this.coursewareObj.id = row.id
            this.coursewareObj.learning = "learning"
            this.courseware = true
        },
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        search () { //查询
            this.queryInfo.pageNum = 1
            this.getTableDataList()
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
