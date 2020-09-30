import request from '@/utils/request'
const baseURL = process.env.NODE_ENV === 'development' ? '/admin' : process.env.VUE_APP_ERP_JAVA_DOMAIN
export const getData = params => {
    return request({
        url: '/warehouseTicket',
        method: 'get',
        params,
        baseURL
    })
}
/* 导出 */
export const exportData = params => {
    return request({
        url: `/warehouseTicket/export`,
        method: 'get',
        params,
        baseURL,
        responseType: 'blob'
    })
}
/* 获取详情 */
export const getContent = ( { type, ticketCode } ) => {
    return request({
        url: `/warehouseTicket/${type}/${ticketCode}`,
        method: 'get',
        baseURL,
    })
}
