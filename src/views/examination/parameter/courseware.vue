<template>
    <div class="all-data-detail">
        <el-row class="elRow" v-if="!coursewareObj.learning">
            <div class="buttons">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="add">增加</el-button>
                <el-button type="success" size="small" icon="el-icon-edit" @click="edit">修改</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
            </div>
        </el-row>
        <el-table :data="tableData" stripe style="width:100%;margin-top: 10px;" @selection-change='tableDataSelect' ref="multipleTable">
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
            <el-table-column prop="name" label="课件名称" align="center"></el-table-column>
            <el-table-column prop="time" label="课时" align="center"></el-table-column>
            <el-table-column prop="grade" label="学分" align="center"></el-table-column>
            <el-table-column prop="type" label="课件类型" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <div class="preview" @click="proveiew(scope.row)" v-if="scope.row.httpurl">
                        查 看
                    </div>
                    <div v-else>
                        - -
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="all-block-pager">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-size="10" class="pagination" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="35%" v-if="dialogFormVisible" :close-on-click-modal="false" class="dialogForm">
            <el-form :model="form" label-width="auto" :rules="formRules" ref="form">
                <el-form-item label="课件名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="课时" prop="time">
                    <el-input v-model="form.time" type="number"></el-input>
                </el-form-item>
                <el-form-item label="学分" prop="grade">
                    <el-input v-model="form.grade" type="number"></el-input>
                </el-form-item>
                <el-form-item label="添加附件">
                    <el-upload ref="upload" class="upload" :action="action" :file-list="fileList" :on-success="fileUploadSuccess" :on-change="handleChange" :on-remove="removeFile" :limit="1" accept=".mp4,.PDF">
                        <el-button type="primary" size="small">
                            点击上传
                        </el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传/png/mp4文件</div> -->
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAndEidt" :disabled="uploadNo">保 存</el-button>
            </div>
        </el-dialog>

        <el-dialog title="查看" :visible.sync="dialog" width="50%">
            <div class="el-dialog-div">
                <!-- pdf文件 -->
                <pdf v-for="item in numPages" :key="item" ref="pdf" :src="src" :page="item" v-if="str == 'pdf'"></pdf>
                <!-- 视频文件 -->
                <video-player class="video-player vjs-custom-skin" ref="videoPlayer" v-if="str == 'mp4'" :playsinline="true" :options="playerOptions">
                </video-player>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialog = false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { coursewareList, addCourseware, editCourseware, delCourseware, getCoursewareId } from '@/api/examination/subject'
import pdf from "vue-pdf";

import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'

export default {
    components: {
        pdf, videoPlayer
    },
    watch: {
        coursewareObj: {
            handler (newVal) {
                this.queryInfo.subjectid = newVal.id
                console.log(newVal);
                this.getTableDataList()
            },
            deep: true
        }
    },
    props: ["coursewareObj"],
    data () {
        return {
            queryInfo: {
                pageSize: 5,
                pageNum: 1,
                subjectid: ""
            },
            tableData: [],//表格数据
            total: 0,//分页总数
            title: "", // 弹框标题
            dialogFormVisible: false,//增加弹窗
            dialog: false, // pdf 查看
            form: {
                name: "",//课件名称
                grade: "",//学分
                time: "",//课时
                hppturl: "",// 附件
                subjectid: "" // 课目id
            },
            formRules: {},
            rowData: [], //  行数据
            status: "",
            fileList: [], // 存放文件
            fileUrl: "",
            action: this.GLOBAL.FILE_UPLOAD_URL + "/file",
            src: "",
            str: "",
            numPages: undefined,
            uploadNo: true,
            playerOptions: {  // mp4  配置
                playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
                autoplay: false,  // 如果为true,浏览器准备好时开始回放
                muted: false,     // 默认情况下将会消除任何音频。
                loop: false,      // 是否视频一结束就重新开始。
                preload: 'auto',  // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9',  // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true,  // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "video/mp4",  // 类型
                    src: ''  // url地址
                }],
                poster: '',  // 封面地址
                notSupportedMessage: '此视频暂无法播放，请稍后再试',  // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,           // 当前时间和持续时间的分隔符
                    durationDisplay: true,       // 显示持续时间
                    remainingTimeDisplay: false, // 是否显示剩余时间功能
                    fullscreenToggle: true       // 是否显示全屏按钮
                }
            }
        }
    },
    created () {
        this.queryInfo.subjectid = this.coursewareObj.id
        this.getTableDataList() // 列表
    },
    methods: {
        getTableDataList () { // 题库维护列表
            coursewareList(this.queryInfo).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total; //总页数
                } else {
                    this.msgError(res.msg)
                }
            });
        },
        search () {  // 查询
            this.getTableDataList()
        },
        handleChange (file, fileList) {
            this.fileList = fileList.slice(-3);
        },
        removeFile (file) {
            this.fileList.splice(this.fileList.findIndex(item => file.uid == item.uid), 1)
        },
        fileUploadSuccess (file) { // 上传文件成功后的回调
        console.log(file);
            if (file.code == 200) {
                this.fileUrl = file.data
                this.msgSuccess(file.msg)
                this.uploadNo = false // 成功后保存按钮可以点击
            } else {
                this.msgError(file.msg)
            }
        },
        tableDataSelect (val) {  //复选框改变
            this.rowData = val
            if (this.rowData.length > 1) {
                const del_row = this.rowData.shift()
                this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
        },
        add () { // 添加
            this.title = '增加'
            this.status = 'add'
            this.form = {
                name: "",//课件名称
                grade: "",//学分
                time: "",//课时
                hppturl: "",// 附件
                subjectid: "" // 课目id
            }
            this.fileList = []
            this.dialogFormVisible = true
        },
        edit () { // 修改
            if (this.rowData.length != 1) {
                this.prompt()
            } else {
                this.title = '编辑'
                this.status = 'edit'
                this.dialogFormVisible = true
                this.form.name = this.rowData[0].name
                this.form.time = this.rowData[0].time
                this.form.grade = this.rowData[0].grade
            }
        },
        del () { // 删除
            if (this.rowData.length != 1) {
                return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
            } else {
                this.msgBox('确定删除?').then(res => {
                    if (res == 'confirm') {
                        delCourseware(this.rowData[0].id).then(res => {
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
        proveiew (row) { // 查看
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
            getCoursewareId(row.id).then(res => {
                console.log(res);
            })
            this.dialog = true;
        },
        saveAndEidt () { // 保存或者修改按钮
            this.form.subjectid = this.queryInfo.subjectid
            this.form.httpurl = this.fileUrl
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.status == 'add') {
                        addCourseware(this.form).then(res => {
                            if (res.code == 200) {
                                this.msgSuccess(res.msg)
                                this.getTableDataList()
                                this.dialogFormVisible = false
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    } else {
                        this.form.id = this.rowData[0].id
                        editCourseware(this.form).then(res => {
                            if (res.code == 200) {
                                this.dialogFormVisible = false
                                this.getTableDataList()
                            } else {
                                this.msgError(res.msg)
                            }
                        })
                    }
                }
            })
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
        prompt () {
            return this.msgBox('请选择数据!').then(res => { }).catch(e => e)
        }
    },
};
</script>
<style lang="less" scoped>
.dialogForm .el-select {
    width: 100%;
}
.el-form-item {
    margin-left: 5px;
}
.el-select,
.el-input--suffix {
    width: 200px;
}
.el-dialog-div {
    height: 550px;
    overflow-y: auto;
}
</style>
