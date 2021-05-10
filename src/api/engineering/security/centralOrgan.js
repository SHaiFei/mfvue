
import request from "@/utils/request"

// 工程转出-转至中央机关列表
export function centralOrganList (query) {
    return request({
        url: "/train/acce/list",
        method: "get",
        params: query
    })
} 

// 工程转出-转至中央机关  详情    列表
export function centralOrganDetailsList (query) {
    return request({
        url: "/train/temp/list?documentAcceId=" + query,
        method: "get",
    })
}

// 工程转出-转至中央机关新增列表
export function centralOrganAddList (query) {
    return request({
        url: "/train/underground/getList",
        method: "get",
        params: query
    })
} 

// 工程转出-转至中央机关新增
export function centralOrganAdd (data) {
    return request({
        url: "/train/acce/insert",
        method: "post",
        data: data
    })
} 

// 工程转出-转至中央机关修改
export function centralOrganEdit (data) {
    return request({
        url: "/train/acce/zy",
        method: "post",
        data: data
    })
} 


// 报废移出列表
export function scrapoutList (query) {
    return request({
        url: "/train/acce/bf",
        method: "get",
        params: query
    })
}


// 报废移出 新增
export function scrapoutAdd (data) {
    return request({
        url: "/train/acce/bfinsert",
        method: "post",
        data: data
    })
}

// 报废移出 修改
export function scrapoutEdit (data) {
    return request({
        url: "/train/acce/bfupdate",
        method: "post",
        data: data
    })
}



// 拆除   移出列表
export function splitoutList (query) {
    return request({
        url: "/train/acce/yc",
        method: "get",
        params: query
    })
}





