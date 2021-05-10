import request from '@/utils/request'

// 获取仓库列表
export function tableDataList (query) {
    return request({
        url: "/wz/store/list",
        method: "get",
        params: query
    })
}

// 仓库新增
export function warehouseAdd (data) {
    return request({
        url: "/wz/store/",
        method: "post",
        data: data
    })
}

// 仓库详细信息
export function getWarhouseInfo (query) {
    return request({
        url: "/wz/store/" + query,
        method: "get"
    })
}
