/* 入库订单 */
import requerst from '@/utils/request'
const baseURL = process.env.NODE_ENV === 'development' ? '/admin' : process.env.VUE_APP_ERP_JAVA_DOMAIN

export const getPurchaseInList = params => {
    return requerst({
        url: '/purchaseIn',
        method: 'get',
        params,
        baseURL
    })
}
/* 查询采购入库单详情 */
export const getPutInStorageOrderDetail = params => {
    return requerst({
        url: `/purchaseIn/${ params }`,
        method: 'get',
        baseURL
    })
}
/* 根据仓库id查询库位列表 */
export const getQuerySpace = params => {
    return requerst({
        url: `/warehouseSpace/querySpace/${ params }`,
        method: 'get',
    })
}
/* 确认入库 */
export const purchaseInStockIn = data => {
    return requerst({
        url: `/purchaseIn/stockIn`,
        method: 'post',
        data,
        baseURL
    })
}
/* 作废 */
export const dropPurchaseIn = params => {
    return requerst({
        url: `/purchaseIn/drop/${params}`,
        method: 'get',
        baseURL
    })
}