import request from "@/utils/request"

export function tableDataList(query) {
    return request({
        url: "/train/storinfo/list",
        method: "GET",
        params: query
    })
}
export function exportData() {
    return request({
        url: "/train/storinfo/export",
        method: "GET"
    })
}