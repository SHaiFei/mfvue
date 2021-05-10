import request from '@/utils/request'

export function tableDataList(query) {
    return request({
        url: "train/underground/getList",
        method: "get",
        params: query
    })
}
export function chakan(id) {
    return request({
        url: "train/underground/selectById/" + id,
        method: "get",
    })
}

// 试题维护列表
export function questionList (query) {
    return request({
        url: 'exam/examquestion/list',
        method: 'get',
        params: query
    })
}
//试题类型
export function questionType (query) {
    return request({
        url: '/system/dm/qt',
        method: 'get',
        params: query
    })
}
// 添加题库
export function addQuestion (data) {
    return request({
        url: '/exam/examquestion',
        method: 'post',
        data: data
    })
}
// 编辑题库
export function editQuestion (data) {
    return request({
        url: '/exam/examquestion',
        method: 'put',
        data: data
    })
}
// 删除题库
export function delQuestion (query) {
    return request({
        url: 'exam/question/' + query,
        method: 'delete'
    })
}

