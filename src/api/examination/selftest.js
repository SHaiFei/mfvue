import request from '@/utils/request'

// 在线自测列表
export function selftestList (query) {
    return request({
        url: '/exam/exampaper/listz',
        method: 'get',
        params: query
    })
}

//  考试结果列表

export function resultsList (query) {
    return request({
        url: '/exam/exampaper/listc',
        method: 'get',
        params: query
    })
}
//  考试统计列表
export function statisicalList (query) {
    return request({
        url: '/exam/exampaper/listct',
        method: 'get',
        params: query
    })
}
//  考试统计查看列表
export function stPreviewlList (query) {
    return request({
        url: '/exam/exampaper/listctc',
        method: 'get',
        params: query
    })
}
//  部门数据
export function deptList (query) {
    return request({
        url: '/system/dm/dept',
        method: 'get',
        params: query
    })
}
//  导出
export function download (query) {
    return request({
        url: '/exam/exampaper/listctd',
        method: 'get',
        params: query
    })
}