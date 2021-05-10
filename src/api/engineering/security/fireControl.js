import request from "@/utils/request"
import Qs from 'qs'

// 资料归档列表
export function tableDataList (query) {
    return request({
        url: "/train/archive/xiaofeng",
        method: "get",
        params: query
    })
}

// 资料归档新增
export function archivingAdd (data) {
    return request({
        url: "/train/archive/xiaofanginsert",
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


// 隐患排查治理  查看工程
export function undergroundList (query) {
    return request({
        url: "/train/underground/getList?underId=" + query,
        method: "get",
        // params: query
    })
}

