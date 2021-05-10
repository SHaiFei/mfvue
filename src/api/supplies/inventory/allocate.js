import request from "@/utils/request"

export function tableDataList(query) {
    return request({
        url: "/train/bills/list",
        method: "GET",
        params: query
    })
}