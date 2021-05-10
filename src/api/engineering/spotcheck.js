import request from "@/utils/request"

// 双随机列表数据
export function tableDataList (query) {
    return request({
        url: "/train/ssjrw/list",
        method: "get",
        params: query
    })
}

// 双随机列表数据删除
export function spotcheckDel (query) {
    return request({
        url: "/train/ssjrw/" + query,
        method: "delete",
    })
}


export function enginTableList (query) {
    return request({
        url: "/train/ssjrw/selectgc",
        method: "get",
        params: query
    })
}


export function enforcementTableList (query) {
    return request({
        url: "/train/ssjrw/cxty",
        method: "get",
        params: query
    })
}