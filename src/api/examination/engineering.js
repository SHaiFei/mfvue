import request from '@/utils/request'

// 工程管理列表
export function tableList (query) {
    return request({
        url: '/project/mean/list',
        method: 'get',
        params: query
    })
}
//工程列表 1
export function projectList (query) {
    return request({
        url: '/project/mean/t1',
        method: 'get',
        params: query
    })
}
//工程列表 2
export function projectList2 (query) {
    return request({
        url: '/project/mean/t2',
        method: 'get',
        params: query
    })
}

//工程列表 3
export function projectList3 (query) {
    return request({
        url: '/project/mean/t3',
        method: 'get',
        params: query
    })
}

//工程列表 3 的详细信息
export function getDataList (query) {
    return request({
        url: '/project/mean/t3dy',
        method: 'get',
        params: query
    })
}
