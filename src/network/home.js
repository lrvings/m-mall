//* 封装首页的请求数据
import {request} from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
