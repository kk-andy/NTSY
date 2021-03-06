import request from '@/utils/request'
const baseURL = process.env.VUE_APP_AUTHORITY_API_DOMAIN
const baseURL1 = process.env.VUE_APP_BASE_API
/* 获取菜单权限 */
export const getMenus = (query) => {
    return request({
        url: '/rest/auth/user/perms',
        method: 'get',
        params: query,
        baseURL
    })
}

/* 获取权限按钮 */
export const getButtonList = (query) => {
    return request({
        url: '/rest/auth/user/perms/buttons',
        method: 'get',
        params: query,
        baseURL
    })
}
/* 注销登录 */
export const logout = () => {
    return request({
        url: '/api/login/logout',
        method: 'get',
        baseURL
    })
}
