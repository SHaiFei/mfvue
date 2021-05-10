import request from "@/utils/request"

export function tableDataList(query) {
    return request({
        url: "/train/ckinfo/list",
        method: "GET",
        params: query
    })
}