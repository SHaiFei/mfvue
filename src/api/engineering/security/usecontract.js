
import request from "@/utils/request"

// 使用管理- 使用合同列表
export function usecontractList (query) {
    return request({
        url: "/train/contract/list",
        method: "get",
        params: query
    })
}

// 使用管理- 服务对象列表
export function serviceList (query) {
    return request({
        url: "/train/unit/list",
        method: "get",
        params: query
    })
}

// 使用管理- 服务对象导出
export function serviceExport (query) {
    return request({
        url: "/train/unit/export",
        method: "get",
        params: query
    })
}


// 使用管理- 示范工程列表
export function demonstrationList (query) {
    return request({
        url: "/train/project/list",
        method: "get",
        params: query
    })
}

// 使用管理- 示范工程列表
export function conversionList (query) {
    return request({
        url: "/train/underground/hp",
        method: "get",
        params: query
    })
}





