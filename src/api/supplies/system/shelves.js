
import request from '@/utils/request'

// 货架列表
export function tableDataList (query) {
    return request({
        url: "/wz/shelf/list",
        method: "get",
        params: query
    })
}

// 所属仓库
export function warehouseList (query) {
    return request({
        url: "/wz/store/list",
        method: "get",
        params: query
    })
}


// 货架添加
export function shelvesAdd (data) {
    return request({
        url: "/wz/shelf/add",
        method: "post",
        data: data
    })
}

// 货架修改
export function shelvesEdit (data) {
    return request({
        url: "/wz/shelf/edit",
        method: "put",
        data: data
    })
}

// 货架删除
export function shelvesDel (data) {
    return request({
        url: "/wz/shelf/remove",
        method: "post",
        data: data
    })
}