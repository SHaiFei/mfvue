import request from "@/utils/request"

// 系统维护-人防工程维护列表
export function maintenanceList (query) {
    return request({
        url: "/train/underground/rf",
        method: "get",
        params: query
    })
}
 //系统维护-事项库管理-安全检查事项维护列表
 export function securityList (query) {
    return request({
        url: "/train/item/list",
        method: "get",
        params: query
    })
}

// 系统维护-事项库管理-安全检查事项维护  新增
export function securityAdd (data) {
    return request({
        url: "/train/item/insert",
        method: "post",
        data: data
    })
}
// 系统维护-事项库管理-安全检查事项维护  修改
export function securityEdit (data) {
    return request({
        url: "/train/item/update",
        method: "put",
        data: data
    })
}

// 系统维护-事项库管理-安全检查事项维护  删除
export function securityDel (query) {
    return request({
        url: "/train/item/" + query,
        method: "delete",
    })
}




// 事项库管理-维护管理检查事项维护列表
export function tableDataList (query) {
    return request({
        url: "/train/item/wh",
        method: "get",
        params: query
    })
}

// 事项库管理-专项检查事项维护列表
export function specialList (query) {
    return request({
        url: "/train/item/zx",
        method: "get",
        params: query
    })
}
