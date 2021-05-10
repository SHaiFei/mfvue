<template>
    <div class="clientHeight" :style="contentStyleObj">
        <el-row :gutter="24">
            <el-col :span="7">
                <div class="leftMain">
                    <div class="weather">
                        <div class="info">
                            <div>
                                <p>欢迎登录, 李阳!</p>
                                <p class="department">所属部门 | 职位</p>
                            </div>
                            <div class="getDate">
                                <div class="temperature">{{ temperature }}<span>℃</span></div>
                                <div class="currentdate">
                                    <p>{{ week }}</p>
                                    <p>{{ currentdate }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate"></Calendar>
                </div>
            </el-col>
            <el-col :span="17">
                <div class="" style="margin-left: -45px;">
                    <div class="rightMain">
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <div class="card">
                                    <p class="cardTitle"><img src="../../assets/image/zuijinxiangmu.png" alt="">最近项目</p>
                                    <div style="margin: 15px">
                                        <div class="cardContent borderTop">
                                            <p><img src="../../assets/image/gonggongkecheng.png" alt=""></br>公共课程</p>
                                            <p><img src="../../assets/image/zicetongji.png" alt=""></br>自测统计</p>
                                            <p><img src="../../assets/image/xingzhengshenpi.png" alt=""></br>行政审批转入</p>
                                        </div>
                                        <div class="cardContent borderBootom">
                                            <p><img src="../../assets/image/chaxun.png" alt=""></br>综合查询</p>
                                            <p><img src="../../assets/image/renfangxitong.png" alt=""></br>人防系统</p>
                                            <p><img src="../../assets/image/xinxiguanli.png" alt=""></br>信息管理</p>
                                        </div>
                                    </div>
                                </div>

                            </el-col>
                            <el-col :span="12">
                                <div class="card">
                                    <p class="cardTitle"><img src="../../assets/image/gonggongkecheng.png" alt="">学习记录</p>
                                    <div class="labelThe">
                                        <div class="selfTest">
                                            <p class="text">自测通过率</p>
                                            <p class="num">50%</p>
                                        </div>
                                        <div class="credits">
                                            <p class="text">已获学分</p>
                                            <p class="num">80分</p>
                                        </div>
                                        <div class="completion">
                                            <p class="text">任务完成率</p>
                                            <p class="num">80.3%</p>
                                        </div>

                                    </div>
                                    <div id="pie" style="width: 100%;height:220px;margin-left: 0px"></div>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24" style="margin-top: 20px">
                            <el-col :span="24">
                                <div class="card" style="height: 345px">
                                    <p class="cardTitle"><img src="../../assets/image/bianjiedaohang.png" alt="">便捷导航</p>
                                    <div class="navigation" style="margin-top: 12px">
                                        <div class="completion">
                                            <p><img src="../../assets/image/daohang1.png" alt="">新建项目</p>
                                        </div>
                                        <div class="completion">
                                            <p><img src="../../assets/image/图层 37.png" alt="">行政审批</p>
                                        </div>
                                        <div class="completion">
                                            <p><img src="../../assets/image/daohang3.png" alt="">便捷操作</p>
                                        </div>
                                    </div>
                                    <div class="navigation">
                                        <div class="completion">
                                            <p><img src="../../assets/image/daohang1.png" alt="">便捷操作1</p>
                                        </div>
                                        <div class="completion">
                                            <p><img src="../../assets/image/daohang5.png" alt="">便捷操作2</p>
                                        </div>
                                        <div class="completion">
                                            <p><img src="../../assets/image/daohang1.png" alt="">便捷操作3</p>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Calendar from 'vue-calendar-component'
export default {
    components: {
        Calendar
    },
    data () {
        return {
            week: "",
            currentdate: "",
            temperature: "",
            today: Date.parse(new Date()).toString(),
            contentStyleObj: {
                height: ""
            }
        }
    },
    created () {
        this.getWeather() // 获取天气
        this.addDate() // 获取日期
        this.getHight()// 获取高度
    },
    mounted () {
        this.drawChart();
        window.addEventListener('resize', this.getHight);
        window.onresize = () => {
            let echarts = require('echarts');
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById("pie"));
            myChart.resize();
        }
    },
    methods: {
        getHight () { // 获取浏览器高度
            this.contentStyleObj.height = window.innerHeight - 152 + 'px'
        },
        getWeather () {  // 获取天气
            const myDate = new Date()
            this.week = '星期' + '日一二三四五六'.charAt(myDate.getDay())
            this.axios.get("https://v0.yiketianqi.com/api?version=v9&appid=87871413&appsecret=oQcuTz1Q").then(res => {
                this.temperature = res.data.data[0].tem
            })
        },
        drawChart () {
            // let echarts = require('echarts');
            var echarts = require('echarts/lib/echarts');
            // 基于准备好的dom，初始化echarts实例
            require("echarts/lib/chart/pie");
            require('echarts/lib/component/legend');
            let myChart = echarts.init(document.getElementById("pie"));
            window.onresize = function () {
                myChart.resize();
            }
            // 指定图表的配置项和数据
            let option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    icon: 'rect',
                    right: '10%',
                    top: '20%',
                    width: "40px",
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        data: [
                            { value: 1048, name: '全部课程' },
                            { value: 735, name: '已学习' },
                            { value: 580, name: '已自测' },
                            { value: 484, name: '通过自测' }
                        ]
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        addDate () {
            var date = new Date();
            var seperator1 = "/";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            this.currentdate = year + seperator1 + month + seperator1 + strDate;
        },
        clickDay (data) {
            console.log(data + "点击了某天"); //选中某天

        },

        changeDate (data) {
            console.log(data); //左右点击切换月份
        },
        clickToday (data) {
            console.log(data); //跳到了本月
        },
    },
}
</script>


<style lang='scss' scoped>
.clientHeight {
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
}
.leftMain {
    height: 100%;
    width: 100%;
    padding: 10px 20px;

    .weather {
        font-size: 18px;
        color: #ffffff;
        // width: 441px;
        // height: 360px;
        height: 443px;
        background-image: url('../../assets/image/geren_bg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;

        .info {
            padding: 27px 20px 0 20px;
        }

        .department {
            font-size: 14px;
            color: #f5f7fa;
        }

        .getDate {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;

            .temperature {
                font-size: 60px;
                margin-top: 30px;
                span {
                    font-size: 30px;
                }
            }
            .currentdate {
                font-size: 16px;
            }
            span {
                display: inline-block;
            }
        }
    }
}
.rightMain {
    height: 100%;
    width: 100%;
    padding: 10px 20px;

    .card {
        font-size: 18px;
        box-shadow: 0px 1px 6px 0px rgba(210, 210, 210, 0.7);
        border-radius: 6px;
        // width: 562px;
        width: 100%;
        height: 375px;

        .cardTitle {
            border-bottom: 1px solid #e5e5e5;
            height: 60px;
            line-height: 60px;
            margin: 0 25px;
        }
        .cardTitle img {
            vertical-align: middle;
            width: 30px;
            height: 30px;
        }

        .cardContent {
            display: flex;
            justify-content: space-evenly;

            p {
                font-size: 16px;
                // width: 120px;
                width: 290px;
                text-align: center;
                height: 140px;
                padding-top: 30px;
                cursor: pointer;
                margin: 0;

                img {
                    width: 30px;
                    height: 30px;
                    margin-bottom: 10px;
                }
            }

            p:hover {
                background-color: #f5f8f9;
            }
        }

        .labelThe {
            display: flex;
            justify-content: space-between;
            margin: 15px 30px;

            .selfTest,
            .credits,
            .completion {
                // width: 25%;
                width: 125px;
                height: 73px;
                text-align: center;
                color: #fff;
                border-radius: 6px;
                font-size: 14px;

                .text {
                    border-bottom: 1px solid #fff;
                    margin: 10px 20px 0 20px;
                }

                .num {
                    margin-top: 15px;
                    font-size: 22px;
                }
            }

            .selfTest {
                background: linear-gradient(180deg, #4f99f4, #6168f1);
            }

            .credits {
                background: linear-gradient(180deg, #f99457, #ed5b43);
            }

            .completion {
                background: linear-gradient(180deg, #29d7a0, #10b572);
            }
        }
        .navigation {
            display: flex;
            justify-content: space-between;

            div {
                width: 430px;
                height: 110px;
                box-shadow: 0px 1px 10px 0px rgba(210, 210, 210, 0.5);
                border-radius: 6px;
                margin: 10px 30px;
                text-align: center;
                padding: 10px;
                img {
                    vertical-align: middle;
                    margin-right: 25px;
                }
            }
        }
    }
}
.borderBootom {
    border-top: 1px solid #e5e5e5;
}
.rightMain .borderTop,
.rightMain .borderBootom {
    p:nth-of-type(1),
    p:nth-of-type(2) {
        border-right: 1px solid #e5e5e5;
    }
}
// 以下是日历表样式
::v-deep .wh_container {
    width: 100%;
    margin: 0;
    max-width: none !important;
}
::v-deep .wh_content_all {
    background-color: #fff !important;
    color: #000 !important;
}
::v-deep .wh_top_changge li {
    color: #000 !important;
    flex: 1;
}
::v-deep .wh_jiantou1,
.wh_jiantou2 {
    border-top: 2px solid #000 !important;
    border-left: 2px solid #000 !important;
}
::v-deep .wh_jiantou2 {
    border-top: 2px solid #000 !important;
    border-right: 2px solid #000 !important;
}
::v-deep .wh_content_item .wh_isToday {
    background: #4097f9 !important;
    border-radius: 5px !important;
    color: #fff;
}
::v-deep .wh_content_item .wh_chose_day {
    background: #4097f9 !important;
    // border-radius: 5px !important;
    color: #fff;
}
::v-deep .wh_want_dayhide {
    color: #000;
}
::v-deep .wh_item_date:hover {
    background: #4097f9;
    cursor: pointer;
    color: #fff;
    border-radius: 100px !important;
}
::v-deep .wh_content_item {
    color: #000 !important;
}
</style>
