import request from '@/utils/request'

// 登录方法
export function login (data) {
    return request({
        url: '/login',
        method: 'post',
        data: data
    })
}

// 获取验证码
export function captchaImage (query) {
    return request({
        url: '/captchaImage',
        method: 'get',
        params: query
    })
}

// 获取用户详细信息
export function getInfo () {
    return request({
        url: '/getInfo',
        method: 'get'
    })
}

// 获取用户详细信息
export function getRouters () {
    return request({
        url: '/gr',
        method: 'get'
    })
}

// 退出方法
export function logout () {
    return request({
        url: '/logout',
        method: 'post'
    })
}

// 用户密码重置
export function updateUserPwd (oldPassword, newPassword) {
    const data = {
        oldPassword,
        newPassword
    }
    return request({
        url: '/system/user/profile/updatePwd',
        method: 'put',
        params: data
    })
}

// 修改用户个人信息
export function updateUserProfile (data) {
    return request({
        url: '/system/user/profile',
        method: 'put',
        data: data
    })
}
