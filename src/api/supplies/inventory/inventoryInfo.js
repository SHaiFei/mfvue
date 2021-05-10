import request from "@/utils/request"

export function tableDataList (query) {
    return request({
        url: "/wz/info/list",
        method: "GET",
        params: query
    })
}
export function exportData () {
    return request({
        url: "/wz/info/export",
        method: "GET"
    })
}
export function downloadData (query) {
    return request({
        url: "/common/download",
        method: "GET",
        params: query
    })
}
