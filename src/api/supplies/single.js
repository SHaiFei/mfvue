import request from '@/utils/request'

// 物资列表
export function tableDataList (query) {
    return request({
        url: "/wz/rkbills/list",
        method: "get",
        params: query
    })
}
