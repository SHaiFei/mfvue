import request from "@/utils/request"

export function tableDataList(query) {
    return request({
        url: "/train/print/list",
        method: "GET",
        params: query
    })
}