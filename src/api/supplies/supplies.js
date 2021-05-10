import request from '@/utils/request'

// 物资列表
export function tableDataList (query) {
    return request({
        url: "/wz/info/list",
        method: "get",
        params: query
    })
}

// 物资类别
export function suppilesType () {
    return request({
        url: "/system/dm/wzt",
        method: "get",
    })
}

// 货架
export function shelvesList () {
    return request({
        url: "/system/dm/sht",
        method: "get",
    })
}

// 供应商
export function supplierList () {
    return request({
        url: "/system/dm/sut",
        method: "get",
    })
}

// 物资新增
export function suppliesAdd (data) {
    return request({
        url: "/wz/info/add",
        method: "post",
        data: data
    })
}

// 物资修改
export function suppliesEdit (data) {
    return request({
        url: "/wz/info/edit",
        method: "put",
        data: data
    })
}

// 物资删除
export function suppilesDel (data) {
    return request({
        url: "/wz/info/remove/",
        method: "post",
        data: data
    })
}