import request from "@/utils/request"
import Qs from 'qs'

// 防汛人员列表
export function tableDataList (query) {
    return request({
        url: "/train/staff/list",
        method: "get",
        params: query
    })
}


// 单位信息
export function unitInfo (query) {
    return request({
        url: "/train/contacts/" + query,
        method: "get",
    })
}

// 防汛值班新增
export function onDutyAdd (data) {
    return request({
        url: "/train/staff/insert",
        method: "post",
        data: data
    })
}

// 防汛值班修改
export function onDutyEdit (data) {
    return request({
        url: "/train/staff/update",
        method: "put",
        data: data
    })
}

// 防汛值班删除
export function onDutyDel (query) {
    return request({
        url: "/train/staff/" + query,
        method: "delete",
    })
}

// 迎汛抢险队伍列表
export function rescueTeamList (query) {
    return request({
        url: "/train/team/list",
        method: "get",
        params: query
    })
}

// 迎汛抢险队伍添加
export function rescueTeamAdd (data) {
    return request({
        url: "/train/team/insert",
        method: "post",
        data: data
    })
}

// 迎汛抢险队伍修改
export function rescueTeamEdit (data) {
    return request({
        url: "/train/team/update",
        method: "put",
        data: data
    })
}

// 迎汛抢险队伍删除
export function rescueTeamDel (query) {
    return request({
        url: "/train/team/" + query,
        method: "delete",
    })
}

// 防汛管理-隐患排查治理
export function tableDataGovernanceList (query) {
    return request({
        url: "/train/danger/fangxun",
        method: "get",
        params: query,
    })
}

// 迎汛物资储备-列表
export function reservesList (query) {
    return request({
        url: "/train/supplies/list",
        method: "get",
        params: query
    })
}

// 迎汛物资储备-添加
export function reservesAdd (data) {
    return request({
        url: "/train/supplies/insert",
        method: "post",
        data: data
    })
}

// 迎汛物资储备-修改
export function reservesEdit (data) {
    return request({
        url: "/train/supplies/update",
        method: "put",
        data: data
    })
}

// 迎汛物资储备-删除
export function reservesDel (query) {
    return request({
        url: "/train/supplies/" + query,
        method: "delete",
    })
}

// 迎汛物资储备-列表
export function reservesDetailList (query) {
    return request({
        url: "/train/middle/list/?msuId=" + query,
        method: "get"
    })
}


// 迎汛物资储备-列表
export function reservesDetailEdit (data) {
    return request({
        url: "/train/middle/update",
        method: "put",
        data: data
    })
}



// 重点防汛部位及抢救措施-列表
export function measuresList (query) {
    return request({
        url: "/train/measures/list",
        method: "get",
        params: query
    })
}


// 迎汛抢险队伍添加
export function measuresAdd (data) {
    return request({
        url: "/train/measures/insert",
        method: "post",
        data: data
    })
}

// 迎汛抢险队伍修改
export function measuresEdit (data) {
    return request({
        url: "/train/measures/update",
        method: "put",
        data: data
    })
}

// 迎汛抢险队伍删除
export function measuresDel (query) {
    return request({
        url: "/train/measures/" + query,
        method: "delete",
    })
}


// 防汛预案-列表
export function planList (query) {
    return request({
        url: "/train/p/list",
        method: "get",
        params: query
    })
}

// 防汛预案添加
export function planAdd (data) {
    return request({
        url: "/train/p/insert",
        method: "post",
        data: data
    })
}

// 防汛预案修改
export function planEdit (data) {
    return request({
        url: "/train/p/update",
        method: "put",
        data: data
    })
}

// 防汛预案删除
export function planDel (query) {
    return request({
        url: "/train/p/" + query,
        method: "delete",
    })
}


// 安全管理-防汛信息统计-防汛通讯录列表
export function addressBookList (query) {
    return request({
        url: "/train/staff/fxtj?divisions=" + query,
        method: "get",
    })
}

// 安全管理-防汛管理-应汛抢险队伍统计-全市
export function teamList (query) {
    return request({
        url: "/train/team/qs",
        method: "get",
        params: query
    })
}


// 安全管理-防汛管理-应汛抢险队伍统计-地区
export function teamDivisionsList (query) {
    return request({
        url: "/train/team/dwtj?divisions=" + query,
        method: "get",
    })
}

// 安安全管理-防汛管理-影讯物资储备统计-全市
export function suppliesList (query) {
    return request({
        url: "/train/supplies/getFloodSuppliesQS",
        method: "get",
        params: query
    })
}


// 安安全管理-防汛管理-影讯物资储备统计-地区
export function suppliesDivisionsList (query) {
    return request({
        url: "/train/supplies/qx?divisions=" + query,
        method: "get",
    })
}

// 安全管理-防汛管理-重点防汛部位及抢险措施统计-全市
export function measuresCityList (query) {
    return request({
        url: "/train/measures/getfloodMeasuresQS",
        method: "get",
        params: query
    })
}


// 安安全管理-防汛管理-重点防汛部位及抢险措施统计-地区
export function measuresDivisionsList (query) {
    return request({
        url: "/train/measures/cstj?divisions=" + query,
        method: "get",
    })
}