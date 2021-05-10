<template>
    <div>
        <!-- 头部背景图 -->
        <el-container class="over">
            <el-header>
                <div class="top-bg">
                    <div class="logo">
                        <img src="../../assets/image/logo.png" alt="">
                        <ul>
                            <li class="el-icon-question">帮助中心</li>
                            <li class="el-icon-s-custom" @click="passwordEdit">{{ userName }}</li>
                            <li class="el-icon-switch-button" @click="logout">退出</li>
                        </ul>
                    </div>
                    <ul class="nav hand flex">
                        <li v-for="(title, index) in tabTitle" :key="index" class="flex1" @click="distribution(index, title)">
                            <a :class="{active:index==isActive}"> {{ title }} </a>
                        </li>
                    </ul>
                </div>
            </el-header>

            <el-container class="content" v-cloak>
                <home v-if="$route.path === '/home'"></home>
                <leftnav v-else :navList="navList"></leftnav>
            </el-container>
        </el-container>

        <el-dialog title="修改信息" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="35%" :close-on-click-modal="false" class="dialogForm">
            <el-tabs v-model="activeTab">
                <el-tab-pane label="基本资料" name="userinfo">
                    <userInfo :user="user" />
                </el-tab-pane>
                <el-tab-pane label="修改密码" name="resetPwd">
                    <resetPwd :user="user" />
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
import leftnav from "@/components/home/leftnav";
import home from "@/components/home/home";
import { removeToken } from '@/utils/auth'
import { getRouters, updateUserPwd } from '@/api/login'

import userInfo from "./userInfo";
import resetPwd from "./resetPwd";

export default {
    data () {
        return {
            user: {},
            navList: [], // 左侧列表数据
            tabTitle: [], // 一级菜单数据(头部)
            leftNavData: [], //  存放左侧列表所有的数据
            userName: "", //  登录名称
            childrenIndex: undefined, // 默认选中的头部数据
            isActive: sessionStorage.getItem("childrenIndex") ? sessionStorage.getItem("childrenIndex") : 0,
            dialogFormVisible: false,
            activeTab: "userinfo"
        }
    },
    // 注册组件
    components: {
        leftnav, home, userInfo, resetPwd
    },
    mounted () {
        this.getRouters()
        this.userName = localStorage.getItem("userName")
    },
    methods: {
        getRouters () {
            this.leftNavData = []
            getRouters().then(res => {
                if (res.code == 200) {
                    res.data.forEach(item => {
                        this.tabTitle.push(item.meta.title)
                        this.leftNavData.push(item.children)
                    });
                    let childrenIndex = sessionStorage.getItem("childrenIndex")
                    if (childrenIndex && childrenIndex != 0) {
                        this.navList = res.data[childrenIndex].children
                    } else {
                        this.navList = res.data[0].children
                    }
                }
            })
        },
        distribution (index, title) {
            this.isActive = index;
            this.navList = []
            this.childrenIndex = sessionStorage.setItem("childrenIndex", index)
            switch (title) {
                // case "首页":
                //     this.isHome = true
                //     this.navList = this.leftNavData[0];
                //     this.$router.push({ path: "/home" }); //首页
                //     break
                case "在线学习":
                    this.isHome = false
                    this.navList = this.leftNavData[0];
                    this.$router.push({ path: "/studys/countries/2" }); //在线学习
                    break
                case "基本信息":
                    this.isHome = false
                    this.navList = this.leftNavData[1];
                    this.$router.push({ path: "/information/resources" });  //基本信息
                    break
                case "工程管理":
                    this.isHome = false
                    this.navList = this.leftNavData[2];
                    this.$router.push({ path: "/engineering/engineering" });//工程管理  
                    break
                case "物资仓储":
                    this.isHome = false
                    this.navList = this.leftNavData[3];
                    this.$router.push({ path: "/supplies/warehouse" });//物资仓储
                    break
                case "系统管理":
                    this.isHome = false
                    this.navList = this.leftNavData[4];
                    this.$router.push({ path: "/management/operationlog" });//系统管理
                    break
            }
        },
        passwordEdit () {
            this.form = {
                oldPassword: undefined,
                newPassword: undefined,
                confirmPassword: undefined
            }
            this.dialogFormVisible = true
        },
        submit () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    updateUserPwd(this.form.oldPassword, this.form.newPassword).then(
                        response => {
                            this.msgSuccess("修改成功");
                        }
                    );
                }
            });
        },
        logout () { // 退出
            this.msgBox("确定要退出吗").then(res => {
                if (res == "confirm") {
                    removeToken()
                    localStorage.removeItem("userName")
                    sessionStorage.removeItem("childrenIndex")
                    this.$router.push({ path: "/login" })
                }
            })
        }
    },
    created () {
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/style.scss';
.logo {
    display: flex;
    justify-content: space-between;

    img {
        width: 471px;
        height: 48px;
        margin: 15px 0 0 37px;
        // float: left;
    }
    ul {
        margin-right: 30px;
        li {
            float: left;
            font-size: 16px;
            color: #ffffff;
            margin: 20px;
            cursor: pointer;
        }
    }
}
.el-header {
    height: 130px !important;
    padding: 0 !important;
}
::v-deep .dialogForm .el-dialog__body {
    padding-top: 0 !important;
}
.el-main {
    padding: 0 !important;
}
.top-bg {
    background: url('~@/assets/image/headerbg2.png') no-repeat center center;
    background-size: 100% 100%;
    width: 100%;
    height: 140px;

    .el-dropdown {
        float: right;
        line-height: 80px;
        margin-right: 30px;
    }
    .avatar-wrapper {
        color: #000;
    }
}
.nav {
    font-size: 17px;
    text-align: center;
    width: 100%;
    position: absolute;
    top: 73px;
    padding-left: 20px;
    li {
        line-height: 55px;
        text-align: center;
        font-weight: 800;
        width: 110px;
        height: 50px;
        margin: 0 8px;
        background-color: #0e41af;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        a {
            width: 110px;
            height: 50px;
            display: inline-block;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            font-weight: 800;
            color: #ffffff;
            &.active {
                background: #ffffff;
                color: #0350aa;
            }
            &:hover {
                background: #ffffff;
                color: #0350aa;
            }
        }
    }
}
.content {
    margin-top: 17px;
}
.el-main {
    height: 100%;
}
::v-deep [v-cloak] {
    display: none !important;
}
</style>
