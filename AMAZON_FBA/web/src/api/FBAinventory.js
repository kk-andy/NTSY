import request from '@/utils/request'
const baseURL = process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_AMAZON_PHP
/* 获取列表 */
export const getData = params => {
    return request({
        url:'/api/fba/inventory_list',
        method: 'get',
        params,
        baseURL
    })
}
/* 导出接口 */
export const exportData = (params) => {
    return request({
        url:'/api/fba/export_inventory',
        method: 'get',
        params,
        baseURL,
        responseType: 'blob'
    })
}