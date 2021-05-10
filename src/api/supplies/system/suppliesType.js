import request from "@/utils/request"

export function tableDataList(query) {
    return request({
        url: "/wz/info/list",
        method: "GET",
        params: query
    })
}