import request from "@/utils/request"

export function tableDataList (query) {
    return request({
        url: "/train/k/list",
        method: "get",
        params: query
    })
}