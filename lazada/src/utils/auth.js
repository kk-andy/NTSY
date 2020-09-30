import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const ToMenus = 'Admin-Menu'
const PHPSESSID = 'PHPSESSID'
const appID = 'Admin-ID'
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
export const setSesstionToken = (token) => sessionStorage.setItem(TokenKey, token)

export const getSesstionToken = () => sessionStorage.getItem(TokenKey)

// 将当前的菜单权限存入到session

export const setMenus = (menus) => sessionStorage.setItem(ToMenus, menus)
export const getMenus = () => sessionStorage.getItem(ToMenus)

export const setAppID = (id) => sessionStorage.setItem(appID, id)
export const getAppID = () => sessionStorage.getItem(appID)
