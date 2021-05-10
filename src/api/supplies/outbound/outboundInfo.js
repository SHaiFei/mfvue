import request from "@/utils/request"

export function tableDataList(query) {
    return request({
        url: "/train/ckbills/list",
        method: "GET",
        params: query
    })
}