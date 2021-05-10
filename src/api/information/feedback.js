import request from '@/utils/request'

// 意见反馈列表
export function tableList (query) {
    return request({
        url: '/project/yjfk/list',
        method: 'get',
        params: query
    })
}

// 添加意见反馈
export function addFeedBack (data) {
    return request({
        url: '/project/yjfk',
        method: 'post',
        data: data
    })
}

// 删除意见反馈
export function delFeedBack (data) {
    return request({
        url: '/project/yjfk/d',
        method: 'post',
        data: data
    })
}

