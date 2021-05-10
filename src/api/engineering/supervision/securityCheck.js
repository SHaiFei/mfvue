import request from "@/utils/request"

export function tableDataList (query) {
    return request({
        url: "/train/underground/list",
        method: "get",
        params: query
    })
}

// 双随机检查--专项检查列表
export function specialCheckList (query) {
    return request({
        url: "/train/jc/list",
        method: "get",
        params: query
    })
}


// 双随机检查--专项检查列表
export function specialCheckInfoList (query) {
    return request({
        url: "/train/un/zx",
        method: "get",
        params: query
    })
}


// 双随机检查--专项检查添加
export function specialCheckAdd (data) {
    return request({
        url: "/train/jc/insert",
        method: "post",
        data: data
    })
}

// 双随机检查--专项检查修改
export function specialCheckEdit (data) {
    return request({
        url: "/train/jc/update",
        method: "put",
        data: data
    })
}

// 双随机检查--专项检查工程清单
export function specialCheckInfo (query) {
    return request({
        url: "/train/jc/gcqd?sckId=" + query,
        method: "get",
    })
}

// 双随机检查--专项检查工程清单
export function specialCheckDel (query) {
    return request({
        url: "/train/jc/" + query,
        method: "delete",
    })
}


// 双随机检查--专项检查工程导出
export function specialCheckExport (query) {
    return request({
        url: "/train/jc/export",
        method: "get",
        params: query
    })
}


// 双随机检查--专项检查工程文件删除
export function specialCheckFileDel (query) {
    return request({
        url: "/train/jc/deleteFile/" + query,
        method: "delete",
    })
}

