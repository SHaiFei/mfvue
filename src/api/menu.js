import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}



// 获取所属区
export const getArea = () => {
    return request({
      url: '/train/chargeunder/qu',
      method: 'get'
    })
  }