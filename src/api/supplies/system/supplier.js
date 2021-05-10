
import request from '@/utils/request'

// 货架列表
export function tableDataList (query) {
    return request({
        url: "/wz/supplier/list",
        method: "get",
        params: query
    })
}

// 供应商添加
export function supplierAdd (data) {
    return request({
        url: "/wz/supplier/add",
        method: "post",
        data: data
    })
}

// 货架修改
export function supplierEdit (data) {
    return request({
        url: "/wz/supplier/edit",
        method: "put",
        data: data
    })
}

// 货架删除
export function supplierDel (data) {
    return request({
        url: "/wz/supplier/remove",
        method: "post",
        data: data
    })
}
