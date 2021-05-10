import request from '@/utils/request'
import Qs from 'qs'

//工程列表 1 添加
export function projectAdd1 (data) {
    return request({
        url: '/project/mean/t1i',
        method: 'post',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data: Qs.stringify(data)
    })
}

//工程列表 1 修改
export function projectEdit (data) {
    return request({
        url: '/project/mean/t1u',
        method: 'post',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data: Qs.stringify(data)
    })
}

//工程列表 2
export function projectAdd2 (data) {
    return request({
        url: '/project/mean/t2u',
        method: 'post',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data: Qs.stringify(data)
    })
}

//工程列表 3
export function projectAdd3 (data) {
    return request({
        url: '/project/mean/t3u',
        method: 'post',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data: Qs.stringify(data)
    })
}

//工程列表 3 单元添加
export function projectDyi (data) {
    return request({
        url: '/project/mean/t3dyi',
        method: 'post',
        data: data
    })
}

//工程列表 3 单元删除
export function projectDelete (data) {
    return request({
        url: '/project/mean/t3dyd',
        method: 'post',
        data: data
    })
}

//工程列表 3 单元保存
export function projectDyu (data) {
    return request({
        url: '/project/mean/t3sbu',
        method: 'post',
        data: data
    })
}

//工程列表 3 单元查看
export function projectView (query) {
    return request({
        url: '/project/mean/t3dy',
        method: 'get',
        params: query
    })
}

// 获取所属街道
export function getStreetNameList (query) {
    return request({
        url: '/project/dm/sj',
        method: 'get',
        params: query
    })
}

// 平时用途
export function ordinaryTimes (query) {
    return request({
        url: '/project/dm/pu',
        method: 'get',
        params: query
    })
}

// 战时用途
export function wartime (query) {
    return request({
        url: '/project/dm/wu',
        method: 'get',
        params: query
    })
}

// 设备
export function equipment (query) {
    return request({
        url: '/project/dm/sd',
        method: 'get',
        params: query
    })
}
