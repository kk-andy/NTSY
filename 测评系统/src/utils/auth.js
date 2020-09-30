import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const ToMenus = 'Admin-Menu'
const PHPSESSID = 'PHPSESSID'
const addSupplier = 'supplierDetail'
const createProduct = 'createProduct'
const authorization = 'authorization'
const supplierID = 'id'
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}
export const setPHPSESSID = (php) => Cookies.set(PHPSESSID, php)
export function removeToken() {
    return Cookies.remove(TokenKey)
}
// 用session存取token
export const setSesstionToken = (token) => {
    sessionStorage.setItem(TokenKey, token)
}
export const setSesstionuSername = (username) => {
    sessionStorage.setItem('userName', username)
}
export const setSesstionSkuToken = (skutoken) => {
    sessionStorage.setItem(authorization, skutoken)
}

export const getSesstionToken = () => sessionStorage.getItem(TokenKey)
export const getSesstionuSername = () => sessionStorage.getItem('userName')
export const getSesstionSkuToken = () => sessionStorage.getItem(authorization)

// 将当前的菜单权限存入到session

export const setMenus = (menus) => sessionStorage.setItem(ToMenus, menus)

export const getMenus = () => sessionStorage.getItem(ToMenus)
    /* 将当前supplier的字段存到session中 */
export function setSuppliers(addSupplierDetail) {
    return sessionStorage.setItem(addSupplier, addSupplierDetail)
}
export const getAddSuppliers = () => sessionStorage.getItem(addSupplier)
export function setProcuct(createProductDetail) {
    return sessionStorage.setItem(createProduct, createProductDetail)
}
export const getCreateProduct = () => sessionStorage.getItem(createProduct)
    /* 存供应商得id */
export const setSupplierId = (id) => sessionStorage.setItem(supplierID, id)
export const getSupplierId = () => sessionStorage.getItem(supplierID)