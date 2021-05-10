import request from '@/utils/request'

// 试卷维护列表
export function paperkList (query) {
    return request({
        url: 'exam/exampaper/list',
        method: 'get',
        params: query
    })
}
// 选择题库列表接口
export function examstockL (query) {
    return request({
        url: '/exam/examstock/l',
        method: 'get',
        params: query
    })
}

// 根据题库选择试题类型接口
export function questionsList (query) {
    return request({
        url: '/exam/exampaper/st',
        method: 'get',
        params: query
    })
}
// 预览接口
export function exampaperYl (data) {
    return request({
        url: '/exam/exampaper/yl',
        method: 'post',
        data: data
    })
}
// 预览保存接口
export function addExampaper (data) {
    return request({
        url: '/exam/exampaper/zj',
        method: 'post',
        data: data
    })
}
// 发布
export function paperRelease(data) {
    return request({
        url: '/exam/exampaper/fb',
        method: 'put',
        data: data
    })
}
// 取消发布
export function cancelRelease(data) {
    return request({
        url: '/exam/exampaper/bf',
        method: 'put',
        data: data
    })
}

// 查看内容
export function previewExampaper (query) {
    return request({
        url: '/exam/exampaper/yl2',
        method: 'get',
        params: query
    })
}
// 删除
export function delExampaper (query) {
    return request({
        url: '/exam/exampaper/' + query,
        method: 'delete'
    })
}
// 试卷提交
export function subExampaper (data) {
    return request({
        url: '/exam/exampaper/jj',
        method: 'put',
        data: data
    })
}

// 考完试之后查看考试结果
export function resultsExampaper (query) {
    return request({
        url: '/exam/exampaper/yl3',
        method: 'get',
        params: query
    })
}
