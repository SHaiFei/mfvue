import request from '@/utils/request'

// 查询在线用户列表
// export function navTabs(query) {
//   return request({
//     url: '/monitor/online/list',
//     method: 'get',
//     params: query
//   })
// }
export function zcApi (query) {
    console.log(query)
}

// 强退用户
export function forceLogout (tokenId) {
    return request({
        url: '/monitor/online/' + tokenId,
        method: 'delete'
    })
}

// 题库维护列表
export function tkList (query) {
    return request({
        url: '/exam/examstock/list',
        method: 'get',
        params: query
    })
}
//课目类型
export function stList (query) {
    return request({
        url: '/system/dm/st',
        method: 'get',
        params: query
    })
}
//所属课目
export function mList (query) {
    return request({
        url: '/system/dm/s',
        method: 'get',
        params: query
    })
}
// 添加题库
export function addExamstock (data) {
    return request({
        url: '/exam/examstock',
        method: 'post',
        data: data
    })
}
// 编辑题库
export function editExamstock (data) {
    return request({
        url: '/exam/examstock',
        method: 'put',
        data: data
    })
}
// 删除题库
export function delExamstock (query) {
    return request({
        url: 'exam/examstock/' + query,
        method: 'delete'
    })
}