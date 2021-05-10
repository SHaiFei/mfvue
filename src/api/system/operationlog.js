import request from "@/utils/request"

// 操作日志列表
export function operationlogList (query) {
    return request({
        url: "/ps/list",
        method: "get",
        params: query
    })
}

// 系统监控列表
export function monitoringList (query) {
    return request({
        url: "/ps/ci",
        method: "get",
        params: query
    })
}

// 系统监控 启动还是停用
export function startOfStop (query) {
    return request({
        url: "/ps/ctf",
        method: "get",
        params: query
    })
}
