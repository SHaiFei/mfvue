import request from '@/utils/request'

// 列表
export function tableDataList (query) {
    return request({
        url: '/exam/subject/list',
        method: 'get',
        params: query
    })
}

// 课目统计列表
export function subjectList (query) {
    return request({
        url: '/learn/learnlog/ll',
        method: 'get',
        params: query
    })
}

// 课件统计列表
export function coursewareList (query) {
    return request({
        url: '/learn/learnlog/cl',
        method: 'get',
        params: query
    })
}

// 弹框表格数据
export function dialogTableDataList (query) {
    return request({
        url: '/learn/learnlog/cul',
        method: 'get',
        params: query
    })
}
