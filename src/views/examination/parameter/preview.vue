<template>
    <div class="all-data-detail">
        <div class="all-titles font-14" v-if="isState != 'previewData'">
            <div style="float: left">
                试卷名称: {{ title }}
            </div>
            <div style="float:right;font-size:42;margin-right: 10px">
                <span v-if="isState == 'selftest'" style="margin-right: 10px;color: red">
                    剩余时间 {{minute}}:{{second}}
                </span>
                <span @click="back">返回</span>
            </div>
        </div>
        <div class="questionHeight" >
            <div class="title">{{ title }}</div>
            <div class="sm">{{ sm }}</div>
            <div v-for="(items, indexs) in preview" :key="indexs">
                <p><span class="titlei1">{{items.titlei1 }}</span> {{ items.titlei2 }}</p>
                <ul>
                    <li v-for="(item, index) in items.arr" :key="index">
                        <p>{{ item.content }} </p>
                        <!-- {{ paramsArr[indexs][index] }} -->
                        <el-radio-group v-model="paramsArr[indexs][index]" v-if="items.type == 1 || items.type == 4">
                            <p v-for="(itemXds, indexXds) in item.xds" :key="indexXds">
                                <el-radio :label="itemXds.xx">{{itemXds.content}}</el-radio>
                            </p>
                        </el-radio-group>
                        <el-checkbox-group v-model="paramsArr[indexs][index]" v-if="items.type == 2">
                            <p v-for="(itemXds, indexXds) in item.xds" :key="indexXds">
                                <el-checkbox :label="itemXds.xx">{{itemXds.content}}</el-checkbox>
                            </p>
                        </el-checkbox-group>
                        <p class="correct" v-if="isState == 'results' && item.df == 'N'" style="color: red">
                            正确答案: {{ item.daan }}
                        </p>
                        <!-- <p class="correct" v-if="isState == 'results' && item.df == 'Y'">
                            正确答案: {{ item.daan }}
                        </p> -->
                        <p class="correct" v-if="isState == 'results'">试题解析: {{ item.tips }}</p>
                    </li>
                </ul>
            </div>
            <el-button size="small" type="primary" @click="submittest" v-if="isState == 'selftest'">
                提交试卷
            </el-button>
        </div>
    </div>
</template>


<script>
import { previewExampaper, subExampaper, resultsExampaper } from "@/api/examination/managment";
export default {
    props: ["previewData"],
    data () {
        return {
            title: "", // 试卷标题
            preview: null,
            sm: "",
            isState: "",
            submittestId: "",
            resId: "", //  查看考试结果的id
            paramsArr: [], // 问题答案数组
            newArr: [],
            stime: "", // 考试开始时间
            etime: "", // 考试结束时间
            minutes: 60, // 倒计时 分
            seconds: 0// 倒计时  秒
        };
    },
    created () {
        this.stime = this.parseTime(new Date().getTime()) // 考试开始时间
        if (this.$route.query.res) {
            let res = JSON.parse(this.$route.query.res);
            this.submittestId = res.id;
            this.isState = res.state
            if (res.id) {
                if (res.state == "results") {
                    // 查看考试结果的接口
                    resultsExampaper({ id: res.id, exampaperdajuanid: res.exampaperdajuanId }).then(res => {
                        if (res.code == 200) {
                            res.data.arr.forEach((item, index) => {
                                if (item.type == "1" || item.type == "4") {
                                    this.paramsArr.push({})
                                    item.arr.forEach((items, ind) => {
                                        this.paramsArr[index][ind] = items.huida
                                    })
                                } else if (item.type == "2") {
                                    this.paramsArr.push(new Array())
                                    item.arr.forEach((items, ind) => {
                                        this.paramsArr[index].push(items.huida.split(","))
                                    });
                                }
                            })
                            this.title = res.data.title
                            this.sm = res.data.sm
                            this.preview = res.data.arr
                        }
                    })
                } else {
                    // 自测管理的查看  和   课程自测 
                    previewExampaper({ id: res.id }).then((res) => {
                        if (res.code == 200) {
                            this.newArr = res.data.arr
                            res.data.arr.forEach((item, index) => {
                                if (item.type == "1" || item.type == "4") {
                                    this.paramsArr.push({});
                                } else if (item.type == "2") {
                                    this.paramsArr.push(new Array())
                                    item.arr.forEach((items, ind) => {
                                        this.paramsArr[index].push(new Array())
                                    });
                                }
                            });
                            this.title = res.data.title;
                            this.sm = res.data.sm;
                            this.preview = res.data.arr;
                        }
                    })
                }
            }
        } else {
            this.getPreviewData();
        }
    },
    mounted () {
        if (this.isState == "selftest") {
            this.countdown()
        }
    },
    methods: {
        getPreviewData () { // 预览回显
            this.isState = this.previewData.state

            this.title = this.previewData.title;
            this.sm = this.previewData.sm;
            this.preview = this.previewData.arr;
            this.preview.forEach((item, index) => {
                if (item.type == "1" || item.type == "4") {
                    this.paramsArr.push({});
                } else if (item.type == "2") {
                    this.paramsArr.push(new Array())
                    item.arr.forEach((items, ind) => {
                        this.paramsArr[index].push(new Array())
                    });
                }
            })
        },
        submittest () { //  保存按钮(回答完试题之后)
            // if (this.minute === 0 && this.second === 0){
            //     this.msgError("")
            // }
            this.etime = this.parseTime(new Date().getTime()) // 考试结束时间
            let params = {
                stime: this.stime,
                etime: this.etime,
                paperid: this.submittestId,
                questions: []
            }
            this.newArr.forEach((item, index) => {
                item.arr.forEach((items, ind) => {
                    if (typeof (this.paramsArr[index][ind]) == 'string') {
                        params.questions.push({ question: items.id, huida: this.paramsArr[index][ind] })
                    } else {
                        if (this.paramsArr[index][ind] != undefined) {
                            params.questions.push({ question: items.id, huida: this.paramsArr[index][ind].join(',') })
                        }
                    }
                })
            })
            // 提交试卷
            subExampaper(params).then(res => {
                if (res.code == 200) {
                    this.$router.push({ path: "/examination/selftest" })
                    this.msgSuccess("保存成功")
                } else {
                    this.msgError(res.msg)
                }
            })
        },
        countdown () { // 倒计时函数
            let time = window.setInterval(() => {
                if (this.minutes !== 0 && this.seconds === 0) {
                    this.minutes -= 1;
                    this.seconds = 59;
                } else if (this.minutes === 0 && this.seconds === 0) {
                    window.clearInterval(time)
                    this.seconds = 0
                    this.isState = ""
                    // return this.msgBox('考试时间结束').then(res => { }).catch(e => e)
                    return this.msgWarning("考试时间结束")
                } else if (this.minutes !== 0 && this.seconds === 0) {
                    this.minutes -= 1;
                    this.seconds = 59;
                }
                 else {
                    this.seconds -= 1;
                }
            }, 1000)
        },
        num (n) { //不够两位数0补充
            return n < 10 ? '0' + n : '' + n
        },
        back () { //返回上一层
            this.$router.go(-1)
        }
    },
    watch: {
        // 监听数值变化
        second: {
            handler (newVal) {
                this.num(newVal)
            }
        },
        minute: {
            handler (newVal) {
                this.num(newVal)
            }
        },
    },
    computed: {
        // 初始化数据
        second () {
            return this.num(this.seconds)
        },
        minute () {
            return this.num(this.minutes)
        },
    }
};
</script>
<style lang='scss' scoped>
.questionHeight {
    width: 720px;
    margin: 0 auto;
    color: #000;
    // height: 600px;
    height: 100%;
    // overflow-y: auto;
}
.titlei1 {
    font-weight: bold;
    font-size: 20px;
    color: red;
}
.title {
    font-size: 34px;
}
.sm {
    font-size: 20px;
}
.title,
.sm {
    margin-top: 35px;
    text-align: center;
}
.all-titles span {
    cursor: pointer;
}
.correct {
    font-size: 15px;
}
</style>
