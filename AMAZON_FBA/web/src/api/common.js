//php baseURL
const phpBaseURL = process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_AMAZON_PHP
import { getStaffIdSession, getStaffNameSession } from '@/utils/auth'
/* 权限中心接口 */
// const permisssonURL = VUE_APP_ERP_OA_DOMAIN
/* java api 公共下拉框接口 */
import request from '@/utils/request'
let params = {
  offset: 0,
  size: 1000
}
const baseURL = process.env.VUE_APP_ERP_OA_DOMAIN
export const getCommonData = () => {
  return request({
    method: 'get',
    url: '/sysDic/queryAllDic',
    // baseURL
  })
}
/* 获取库位中OA人员列表 */
export const getOAUserList = () => {
  console.log(sessionStorage.getItem('OA-Token'))
  return request({
    url: '/rest/ding/user',
    method: 'get',
    params,
    baseURL,
  })
}
/* 后去oa的toekn */
export const getOAUserToken = (params) => {
  return request({
    url: '/rest/authorization/authorize',
    method: 'get',
    params,
    baseURL
  })
}
/* 获取用户staffId */
export const getStaffId = () => {
  return request({
    url: '/rest/auth/user/staffid',
    method: 'get',
    baseURL,
  })
}
/* 获取用户名称 */
export const getStaffName = () => {
  return request({
    url: '/rest/auth/user/name',
    method: 'get',
    baseURL
  })
}
//获取全部虚拟仓
export function reqGetWareHouse(arg) {
  return request({
    url: "/api/basic/virt_warehouses",
    method: "get",
    params: arg,
    baseURL: phpBaseURL
  })
}
//获取权限店铺列表
export function reqGetShopList() {
  return request({
    url: "/userShop/queryUserShop",
    method: "get",
  })
}
/* 获取所有店铺 */
export const getAllShop = () => {
  return request({
    url: '/api/basic/shops',
    methodL: "get",
    baseURL: phpBaseURL
  })
}
//到货情况
export function reqGetArriveStatus(arg) {
  return request({
    url: "/api/basic/arrival_status",
    methodL: "get",
    params: arg,
    baseURL: phpBaseURL
  })
}
/* 获取中转仓列表 */
export const gettransitWarehoureList = () => {
  return request({
    url: "/warehouse/queryTransfer",
    method: "get",
  })
}