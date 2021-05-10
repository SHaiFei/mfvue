import Vue from 'vue'
import VueRouter from 'vue-router'
import { setToken, removeToken, getToken } from '@/utils/auth'

Vue.use(VueRouter)
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history', // 去掉url中的#
    routes: [
        // {
        //   path: '/404',
        //   component: (resolve) => require(['@/views/error/404'], resolve),
        //   hidden: true
        // },
        // {
        //   path: '/401',
        //   component: (resolve) => require(['@/views/error/401'], resolve),
        //   hidden: true
        // },
        {
            path: '/login',
            component: resolve => require(['@/views/login/index'], resolve)
        },
        {
            path: '/',
            name: '首页',
            component: resolve => require(['@/views/index/index'], resolve),
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: (resolve) => require(['@/components/home/home'], resolve),
                },
                // 在线学习
                {
                    path: '/studys/countries/:status',
                    name: '国家',
                    component: (resolve) => require(['@/views/learning/learning.vue'], resolve),
                    // component: (resolve) => require(['@/views/studys/flfg/countries.vue'], resolve),
                },
                {
                    path: '/studys/subject',
                    name: '课目统计',
                    component: (resolve) => require(['@/views/learning/subject.vue'], resolve),
                },
                {
                    path: '/studys/courseware',
                    name: '课件统计',
                    component: (resolve) => require(['@/views/learning/courseware.vue'], resolve),
                },
                // 在线考试
                {
                    path: '/examination/management',
                    name: '自测管理',
                    component: (resolve) => require(['@/views/examination/parameter/management'], resolve),
                },
                {
                    path: '/examination/subject',
                    name: '课目管理',
                    component: (resolve) => require(['@/views/examination/parameter/subject'], resolve),
                },
                {
                    path: '/examination/managementAdd',
                    name: '自测管理添加',
                    component: (resolve) => require(['@/views/examination/parameter/managementAdd'], resolve),
                },
                {
                    path: '/examination/preview',
                    name: '查看内容',
                    component: (resolve) => require(['@/views/examination/parameter/preview'], resolve),
                },
                // {
                //     path: '/examination',
                //     name: '参数设置',
                //     component: (resolve) => require(['@/views/examination/parameter/maintenance'], resolve),
                // },
                {
                    path: '/examination/maintenance',
                    name: '题库维护',
                    component: (resolve) => require(['@/views/examination/parameter/maintenance'], resolve),
                    // component: () => import('@/views/examination/parameter/maintenance'),
                },
                {
                    path: '/examination/questions',
                    name: '试题维护',
                    component: (resolve) => require(['@/views/examination/parameter/questions'], resolve),
                },
                {
                    path: '/examination/selftest',
                    name: '在线自测',
                    component: (resolve) => require(['@/views/examination/selftest/test'], resolve),
                },
                {
                    path: '/examination/results',
                    name: '考试结果',
                    component: (resolve) => require(['@/views/examination/selftest/results'], resolve),
                },
                {
                    path: '/examination/statistical',
                    name: '考试统计',
                    component: (resolve) => require(['@/views/examination/statistical/statistical'], resolve),
                },
                {
                    path: '/examination/statistpreview',
                    name: '考试统计查看',
                    component: (resolve) => require(['@/views/examination/statistical/statistPreview'], resolve),
                },

                // 基本信息
                {
                    path: '/information/resources',
                    name: '资源图层',
                    component: (resolve) => require(['@/views/information/layer/resources'], resolve),
                },
                {
                    path: '/information/analyse',
                    name: '统计分析',
                    component: (resolve) => require(['@/views/information/layer/analyse'], resolve),
                },
                {
                    path: '/information/info',
                    name: '信息管理',
                    component: (resolve) => require(['@/views/information/layer/info'], resolve),
                },
                {
                    path: '/information/comprehensivequery',
                    name: 'comprehensivequery',
                    component: (resolve) => require(['@/views/information/layer/comprehensiveQuery'], resolve),
                },
                // 帮助中心
                {
                    path: '/information/download',
                    name: '资料下载',
                    component: (resolve) => require(['@/views/information/help/download'], resolve),
                },
                {
                    path: '/information/feedback',
                    name: '意见反馈',
                    component: (resolve) => require(['@/views/information/help/feedback'], resolve),
                },

                // 工程管理
                // 信息管理
                {
                    path: '/engineering/engineering',
                    name: '工程管理',
                    component: (resolve) => require(['@/views/engineering/engineering'], resolve),
                },
                {
                    path: '/engineering/detailsadd',
                    name: '工程管理添加',
                    component: (resolve) => require(['@/views/engineering/detailsAdd'], resolve),
                },
                {
                    path: '/engineering/detailsedit',
                    name: '工程管理修改',
                    component: (resolve) => require(['@/views/engineering/detailsEdit'], resolve),
                },
                {
                    path: '/engineering/details',
                    name: '工程管理查看',
                    component: (resolve) => require(['@/views/engineering/details'], resolve),
                },
                // 工程转入
                {
                    path: '/engineering/approval',
                    name: '行政审批转入',
                    component: (resolve) => require(['@/views/engineering/engineering/approval'], resolve),
                },
                {
                    path: '/engineering/central',
                    name: '中央机关转入',
                    component: (resolve) => require(['@/views/engineering/engineering/central'], resolve),
                },
                // 监控报警
                {
                    path: '/engineering/supervision',
                    name: '监督检查',
                    component: (resolve) => require(['@/views/engineering/lawenforcement/supervision'], resolve),
                },
                {
                    path: '/engineering/spotcheck',
                    name: '双随机检查',
                    component: (resolve) => require(['@/views/engineering/lawenforcement/spotcheck'], resolve),
                },
                {
                    path: '/engineering/spotcheckInfo',
                    name: '双随机检查详情',
                    component: (resolve) => require(['@/views/engineering/lawenforcement/supervision/specialCheckInfo'], resolve),
                },
                // 监控报警
                {
                    path: '/engineering/monitoring',
                    name: '视频监控',
                    component: (resolve) => require(['@/views/engineering/monitoring/monitoring'], resolve),
                },
                // 维护维修
                {
                    path: '/engineering/contractMaintenance',
                    name: '维护维修合同',
                    component: (resolve) => require(['@/views/engineering/maintenance/contractMaintenance'], resolve),
                },
                {
                    path: '/engineering/checkmain',
                    name: '完好性检查',
                    component: (resolve) => require(['@/views/engineering/maintenance/check'], resolve),
                },
                {
                    path: '/engineering/planmanagement',
                    name: '计划管理',
                    component: (resolve) => require(['@/views/engineering/maintenance/planManagement'], resolve),
                },
                {
                    path: '/engineering/progress',
                    name: '进度管理',
                    component: (resolve) => require(['@/views/engineering/maintenance/progress'], resolve),
                },
                // 使用管理
                {
                    path: '/engineering/production',
                    name: '安全生产',
                    component: (resolve) => require(['@/views/engineering/security/production'], resolve),
                },
                {
                    path: '/engineering/firecontrol',
                    name: '消防管理',
                    component: (resolve) => require(['@/views/engineering/security/fireControl'], resolve),
                },
                {
                    path: '/engineering/controlmanagement',
                    name: '防汛管理',
                    component: (resolve) => require(['@/views/engineering/security/controlManagement'], resolve),
                },
                {
                    path: '/engineering/comprehensive',
                    name: '综合治理',
                    component: (resolve) => require(['@/views/engineering/security/comprehensive'], resolve),
                },
                {
                    path: '/engineering/risk',
                    name: '风险评估',
                    component: (resolve) => require(['@/views/engineering/security/risk'], resolve),
                },
                // 使用管理
                {
                    path: '/engineering/usecontract',
                    name: '使用合同',
                    component: (resolve) => require(['@/views/engineering/useMaintenance/useContract'], resolve),
                },
                {
                    path: '/engineering/service',
                    name: '服务对象',
                    component: (resolve) => require(['@/views/engineering/useMaintenance/service'], resolve),
                },
                {
                    path: '/engineering/useplanning',
                    name: '使用规划',
                    component: (resolve) => require(['@/views/engineering/useMaintenance/usePlanning'], resolve),
                },
                {
                    path: '/engineering/demonstration',
                    name: '示范工程',
                    component: (resolve) => require(['@/views/engineering/useMaintenance/demonstration'], resolve),
                },
                // 平战转换
                {
                    path: '/engineering/conversion',
                    name: '平战转换方案',
                    component: (resolve) => require(['@/views/engineering/conversion/conversion'], resolve),
                },
                // 工程转出
                {
                    path: '/engineering/centralorgan',
                    name: '转至中央机关',
                    component: (resolve) => require(['@/views/engineering/rollout/centralOrgan'], resolve),
                },
                {
                    path: '/engineering/splitout',
                    name: '拆除移出',
                    component: (resolve) => require(['@/views/engineering/rollout/splitout'], resolve),
                },
                {
                    path: '/engineering/scrapout',
                    name: '报废移出',
                    component: (resolve) => require(['@/views/engineering/rollout/scrapout'], resolve),
                },
                // 查询统计
                {
                    path: '/engineering/query',
                    name: '综合查询',
                    component: (resolve) => require(['@/views/engineering/statistical/query'], resolve),
                },
                {
                    path: '/engineering/report',
                    name: '统计报表',
                    component: (resolve) => require(['@/views/engineering/statistical/report'], resolve),
                },
                // 系统维护
                {
                    path: '/engineering/maintenance',
                    name: '人防工程维护',
                    component: (resolve) => require(['@/views/engineering/system/maintenance'], resolve),
                },
                {
                    path: '/engineering/library',
                    name: '事项库管理',
                    component: (resolve) => require(['@/views/engineering/system/library'], resolve),
                },
                {
                    path: '/engineering/evaluation',
                    name: '评定细则维护',
                    component: (resolve) => require(['@/views/engineering/system/evaluation'], resolve),
                },
                {
                    path: '/engineering/supplies',
                    name: '迎讯物资维护',
                    component: (resolve) => require(['@/views/engineering/system/supplies'], resolve),
                },
                {
                    path: '/engineering/check',
                    name: '完好性检查内容',
                    component: (resolve) => require(['@/views/engineering/system/check'], resolve),
                },
                {
                    path: '/engineering/typeMaintenance',
                    name: '亮点类型维护',
                    component: (resolve) => require(['@/views/engineering/system/typeMaintenance'], resolve),
                },
                {
                    path: '/engineering/chargeInformation',
                    name: '收费工程信息维护',
                    component: (resolve) => require(['@/views/engineering/system/chargeInformation'], resolve),
                },
                {
                    path: '/engineering/qualifiedPersonnel',
                    name: '资质人员管理',
                    component: (resolve) => require(['@/views/engineering/system/qualifiedPersonnel'], resolve),
                },
                {
                    path: '/engineering/riskAssessment',
                    name: '风险评估维护',
                    component: (resolve) => require(['@/views/engineering/system/riskAssessment'], resolve),
                },

                // 系统管理
                {
                    path: '/management/operationlog',
                    name: '操作日志',
                    component: (resolve) => require(['@/views/system/log/operationlog'], resolve),
                },
                {
                    path: '/management/monitoring',
                    name: '系统监控',
                    component: (resolve) => require(['@/views/system/log/monitoring'], resolve),
                },

                
                // 物资仓储
                // 基本信息管理
                {
                    path: '/supplies/warehouse',
                    name: '仓库信息管理',
                    component: (resolve) => require(['@/views/supplies/information/warehouse'], resolve),
                },
                {
                    path: '/supplies/warehouseInfo',
                    name: '仓库信息管理详情',
                    component: (resolve) => require(['@/views/supplies/information/warehouse/warehouseInfo'], resolve),
                },
                {
                    path: '/supplies/supplies',
                    name: '物资信息管理',
                    component: (resolve) => require(['@/views/supplies/information/supplies'], resolve),
                },


                // 物资入库管理
                {
                    path: '/supplies/storage',
                    name: '物资入库',
                    component: (resolve) => require(['@/views/supplies/storage/storage'], resolve),
                },
                {
                    path: '/supplies/single',
                    name: '物资入库单',
                    component: (resolve) => require(['@/views/supplies/storage/single'], resolve),
                },
                {
                    path: '/supplies/historyInfo',
                    name: '物资入库单历史信息',
                    component: (resolve) => require(['@/views/supplies/storage/historyInfo'], resolve),
                },


                // 物资出库管理
                {
                    path: '/supplies/outbound',
                    name: '出库申请',
                    component: (resolve) => require(['@/views/supplies/outbound/outbound'], resolve),
                },
                {
                    path: '/supplies/outboundSupplies',
                    name: '物资出库',
                    component: (resolve) => require(['@/views/supplies/outbound/outboundSupplies'], resolve),
                },
                {
                    path: '/supplies/outboundInfo',
                    name: '出库单信息',
                    component: (resolve) => require(['@/views/supplies/outbound/outboundInfo'], resolve),
                },
                {
                    path: '/supplies/suppliesInfo',
                    name: '物资出库历史信息',
                    component: (resolve) => require(['@/views/supplies/outbound/suppliesInfo'], resolve),
                },


                // 盘点及阈值管理
                {
                    path: '/supplies/inventoryInfo',
                    name: '物资库存信息',
                    component: (resolve) => require(['@/views/supplies/inventory/inventoryInfo'], resolve),
                },
                {
                    path: '/supplies/inventorymanagement',
                    name: '物资盘点管理',
                    component: (resolve) => require(['@/views/supplies/inventory/inventoryManagement'], resolve),
                },
                {
                    path: '/supplies/threshold',
                    name: '物资阈值管理',
                    component: (resolve) => require(['@/views/supplies/inventory/threshold'], resolve),
                },
                {
                    path: '/supplies/overdue',
                    name: '物资超期管理',
                    component: (resolve) => require(['@/views/supplies/inventory/overdue'], resolve),
                },
                {
                    path: '/supplies/allocate',
                    name: '物资调配管理',
                    component: (resolve) => require(['@/views/supplies/inventory/allocate'], resolve),
                },


                 // 统计与检索
                 {
                    path: '/supplies/statistical',
                    name: '按物库统计报表',
                    component: (resolve) => require(['@/views/supplies/statistical/statistical'], resolve),
                },
                {
                    path: '/supplies/retrieve',
                    name: '按条件检索',
                    component: (resolve) => require(['@/views/supplies/statistical/retrieve'], resolve),
                },
                

                // 系统维护
                {
                    path: '/supplies/suppliesType',
                    name: '物资类别管理',
                    component: (resolve) => require(['@/views/supplies/system/suppliesType'], resolve),
                },
                {
                    path: '/supplies/shelves',
                    name: '货架管理',
                    component: (resolve) => require(['@/views/supplies/system/shelves'], resolve),
                },
                {
                    path: '/supplies/supplier',
                    name: '供应商管理',
                    component: (resolve) => require(['@/views/supplies/system/supplier'], resolve),
                },
                {
                    path: '/supplies/suppliesLabel',
                    name: '物资标签管理',
                    component: (resolve) => require(['@/views/supplies/system/suppliesLabel'], resolve),
                },


            ],
            redirect: "/login"  // 默认登录页面
        }
    ]
})
// router.beforeEach((to, from, next) => {
//     const token = getToken()
//     if (to.path != '/login' && !token) {
//         return next('/login')
//     } else if (to.path != '/login' && token) {
//         next()
//     } else {
//         next({
//             path: '/login',
//             query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//         })
//     }
// })

// export default new VueRouter({
//     // mode: 'hash',
//     mode: 'history', // 去掉url中的#
//     // scrollBehavior: () => ({ y: 0 }),
//     routes: router
// })
export default router