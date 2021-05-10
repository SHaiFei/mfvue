import request from "@/utils/request"
import Qs from 'qs'

// 目标责任书列表
export function tableDataList (query) {
    return request({
        url: "/train/goalduty/list",
        method: "get",
        params: query
    })
}

// 目标责任书新增
export function targetAdd (data) {
    return request({
        url: "/train/goalduty/insert",
        method: "post",
        data: data
    })
}
// 目标责任书修改
export function targetEdit (data) {
    return request({
        // headers:{'Content-Type':'application/x-www-form-urlencoded'},
        url: "/train/goalduty/update",
        method: "put",
        data: data
        // data: Qs.stringify(data)
    })
}

// 目标责任书删除
export function targetDel (query) {
    return request({
        url: "/train/goalduty/" + query,
        method: "delete",
    })
}

// 资料归档列表
export function tableDataArchivingList (query) {
    return request({
        url: "/train/archive/list",
        method: "get",
        params: query
    })
}

// 资料归档新增
export function archivingAdd (data) {
    return request({
        url: "/train/archive/insert",
        method: "post",
        data: data
    })
}

// 资料归档修改
export function archivingEdit (data) {
    return request({
        url: "/train/archive/update",
        method: "put",
        data: data
    })
}

// 资料归档删除
export function archivingDel (query) {
    return request({
        url: "/train/archive/" + query,
        method: "delete",
    })
}

// 隐患排查治理列表
export function tableDataGovernanceList (query) {
    return request({
        url: "/train/danger/list",
        method: "get",
        params: query
    })
}


// 安全生产评定列表
export function tableDataProductionList (query) {
    return request({
        url: "/train/yield/list",
        method: "get",
        params: query
    })
}

