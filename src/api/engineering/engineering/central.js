import request from "@/utils/request"

// 工程转入-中央机关转入列表
export function centralList (query) {
    return request({
        url: "/train/acce/zygc",
        method: "get",
        params: query
    })
}

// 工程转入-中央机关转入查看列表
export function centralViewList (query) {
    return request({
        url: "/train/temp/list?documentAcceId=" + query,
        method: "get",
    })
}

// 工程转入-中央机关转入添加
export function centralAdd (data) {
    return request({
        url: "/train/acce/add",
        method: "post",
        data: data
    })
}

// 工程转入-中央机关转入修改
export function centralEdit (data) {
    return request({
        url: "/train/acce/update",
        method: "put",
        data: data
    })
}

