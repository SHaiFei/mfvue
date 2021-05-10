import request from "@/utils/request"
import Qs from 'qs'

// 综合治理列表
export function tableDataList (query) {
    return request({
        url: "/train/archive/zonghe",
        method: "get",
        params: query
    })
}

// 综合治理新增
export function comprehensiveAdd (data) {
    return request({
        url: "/train/archive/zongheinsert",
        method: "post",
        data: data
    })
}

// 综合治理修改
export function comprehensiveEdit (data) {
    return request({
        url: "/train/archive/zongheupdate",
        method: "put",
        data: data
    })
}

// 综合治理删除
export function comprehensiveDel (query) {
    return request({
        url: "/train/archive/" + query,
        method: "delete",
    })
}


// 风险评估列表列表
export function riskList (query) {
    return request({
        url: "/train/underground/fxpg",
        method: "get",
        params: query
    })
}



