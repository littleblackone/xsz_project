import {request} from "../utils/request"

//获取导航栏数据
export function listNav(){
  return request({
     url:"/nav/get",
     method:"POST"
  })
}

//获取新闻列表
export function listNews(data){
  return request({
    url:"/news/get",
    method:"POST",
    data
  })
}

//获取新闻详情
export function newsDetail(data){
  return request({
    url:"/news/detail",
    method:"POST",
    data
  })
}

//获取产品列表
export function queryProduct(data){
  return request({
    url:"/product/getlist",
    method:"POST",
    data
  })
}
//获取产品详情
export function queryProductDetail(data){
  return request({
    url:"/product/detail",
    method:"POST",
    data
  })
}

//根据关键字从所有产品中模糊查询
export function searchProduct(data){
  return request({
    url:"/product/getlist",
    method:"POST",
    data
  })
}
