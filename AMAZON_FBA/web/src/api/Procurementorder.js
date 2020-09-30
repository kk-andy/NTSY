/* 采购订单 */
import requerst from '@/utils/request'
const baseURL = process.env.NODE_ENV === 'development' ? '/admin' : process.env.VUE_APP_ERP_JAVA_DOMAIN

export const getPurchaseOrderList = params => {
    return requerst({
        url: '/purchaseOrder',
        method: 'get',
        params,
        baseURL
    })
}
/* 获取查询采购单详情 */
export const getPurchaseOrderDetail = params => {
    return requerst({
        url: `/purchaseOrder/${ params }`,
        method: 'get',
        baseURL
    })
}
/* 生成入库单 */
export const generatePurchaseIn = data => {
    return requerst({
        url: `/purchaseIn`,
        method: 'post',
        data,
        baseURL
    })
}