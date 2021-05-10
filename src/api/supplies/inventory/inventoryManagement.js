import request from "@/utils/request"

export function tableDataList(query) {
    return request({
        url: "/train/pdjg/list",
        method: "GET",
        params: query
    })
}
export function pandianList(query) {
    return request({
        url: "/wz/info/list",
        method: "GET",
        params: query
    })
}

export function pandianAdd(data) {
    return request({
        url: "/train/pdjg/add",
        method: "POST",
        data: data
    })
}