<template>
    <el-container>
        <el-aside width="220px" style="background-color: #ffffff">
            <el-menu class="el-menu-vertical-demo" :default-active="$route.path" router unique-opened>
                <el-submenu v-for="(navItem, index) in navList" v-if="navItem.children" :key="navItem.path" :index="navItem.path">
                    <template slot="title">
                        <span>{{ navItem.meta.title }}</span>
                    </template>
                    <el-menu-item v-for="nav in navItem.children" :index="nav.path" :key="nav.path">
                        <span slot="title">{{ nav.meta.title }}</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="navItem.path" :key="navItem.path">
                    <span slot="title">{{ navItem.meta.title }}</span>
                </el-menu-item>
            </el-menu>
            </el-scrollbar>
        </el-aside>

        <el-container class="clientHeight" :style="contentStyleObj">
            <router-view></router-view>
        </el-container>

    </el-container>
</template>

<script>
export default {
    props: {
        navList: {
            type: Array,
        },
    },
    data () {
        return {
            contentStyleObj: {
                height: ""
            }
        };
    },
    created () {
        // 加载内容区域高度
        this.getHight()
    },
    mounted () {
        window.addEventListener('resize', this.getHight);
    },
    methods: {
        getHight () { // 获取浏览器高度
            this.contentStyleObj.height = window.innerHeight - 162 + 'px'
        },
    },
};
</script>

<style lang="scss" scoped>
.clientHeight {
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fff;
    margin-left: 15px;
}
.el-aside {
    box-shadow: 1px 1px 5px 0px rgba(210, 210, 210, 0.7);
    padding-right: 1px;
    overflow-x: hidden;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    max-height: 400px;
}
.el-menu--inline .is-active {
    background: url('../../assets/image/jiantou.png') 0 0 no-repeat #3277ff;
    background-position: 175px 16px;
    background-size: 20px 20px;
    // background: linear-gradient( 90deg, #2e65fd 0%, rgba(85, 144, 235) 100% );
    color: #fff;
}
::v-deep .is-opened .el-submenu__title .el-submenu__icon-arrow {
    transform: rotate(0deg) !important;
}
::v-deep .el-menu--inline {
    // background: rgba(162, 194, 217, 0.2);
    background: #f5f7fa;
}
::v-deep .el-submenu__title,
.el-menu-item {
    font-size: 16px !important;
    .el-submenu__icon-arrow {
        transform: rotate(-90deg);
    }
}
::v-deep .el-menu--inline .el-menu-item {
    font-size: 14px !important;
}
::v-deep .el-submenu__icon-arrow {
    color: #000;
    font-weight: 900;
}
</style>