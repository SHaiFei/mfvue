import request from '@/utils/request'

// 课目列表
export function subjectList (query) {
    return request({
        url: '/exam/subject/list',
        method: 'get',
        params: query
    })
}

// 课目分类
export function classification (query) {
    return request({
        url: '/system/dm/ml',
        method: 'get',
        params: query
    })
}

// 专业课程
export function professional (query) {
    return request({
        url: '/system/dm/m',
        method: 'get',
        params: query
    })
}

// 专业课程添加
export function addProfessional (data) {
    return request({
        url: '/exam/subject',
        method: 'post',
        data: data
    })
}

// 专业课程修改
export function editProfessional (data) {
    return request({
        url: '/exam/subject',
        method: 'put',
        data: data
    })
}

// 专业课程删除
export function delProfessional (query) {
    return request({
        url: '/exam/subject/' + query,
        method: 'delete',
    })
}

// 课件列表
export function coursewareList (query) {
    return request({
        url: '/learn/courseware/list',
        params: query,
        method: 'get',
    })
}
//  添加课件
export function addCourseware (data) {
    return request({
        url: '/learn/courseware',
        method: 'post',
        data: data
    })
}

//  编辑课件
export function editCourseware (data) {
    return request({
        url: '/learn/courseware',
        method: 'put',
        data: data
    })
}

//  删除课件
export function delCourseware (query) {
    return request({
        url: '/learn/courseware/delete/' + query,
        method: 'put'
    })
}

//  上传课件文件
export function uploadFile (data) {
    return request({
        url: '/',
        method: 'put',
        data: data
    })
}

// 课件查看后调用
export function getCoursewareId (query) {
    return request({
        url: '/learn/courseware/a/' + query,
        method: 'get'
    })
}
