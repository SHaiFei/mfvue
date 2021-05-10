import request from "@/utils/request"

export function tableDataList (query) {
    return request({
        url: "/train/schedule/list",
        method: "get",
        params: query
    })
}


//  维护维修-维护维修合同列表
export function contractMaintenanceList (query) {
    return request({
        url: "/train/contract/whwx",
        method: "get",
        params: query
    })
}

//  维护维修-完好性检查列表
export function checkList (query) {
    return request({
        url: "/train/temp/list",
        method: "get",
        params: query
    })
}

//  维护维修- 计划管理列表
export function planManagementList (query) {
    return request({
        url: "/train/plan/list?maYear=" + query,
        method: "get",
    })
}


//  维护维修- 计划管理列表导出
export function exportList (query) {
    return request({
        url: "/train/plan/export?maYear=" + query,
        method: "get",
    })
}
