
import request from "@/utils/request"

// 使用管理 - 规划方案管理  -  列表
export function useManagementList (query) {
    return request({
        url: "/train/scheme/list",
        method: "get",
        params: query
    })
}


// 使用管理 - 使用规划  -  列表
export function usePlanningList (query) {
    return request({
        url: "/train/underground/fxpg",
        method: "get",
        params: query
    })
}

// 使用管理 - 使用规划  规划1-  列表
export function usePlanningFormList1 (query) {
    return request({
        url: "/train/up/list?underId=" + query,
        method: "get",
    })
}

// 使用管理 - 使用规划  规划2-  列表
export function usePlanningFormList2 (query) {
    return request({
        url: "/train/up/no?underId=" + query,
        method: "get",
    })
}


// 使用管理 - 可用项维护  -  列表
export function useMaintenanceList (query) {
    return request({
        url: "/train/isusable/yes",
        method: "get",
        params: query
    })
}

// 使用管理 - 禁用项维护  -  列表
export function disableMaintenanceList (query) {
    return request({
        url: "/train/isusable/no",
        method: "get",
        params: query
    })
}
