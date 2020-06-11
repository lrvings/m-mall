//* 封装首页的请求数据
import {request} from './axios'

export function getHomeMultidata() {
  return request({
    url: '/home'
  })
}

//* 商品数据 -->需传参
export function getHomeGoods() {
  return request({
    url: '/goods',
  })
}
