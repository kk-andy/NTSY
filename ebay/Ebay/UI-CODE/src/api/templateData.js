import request from '@/utils/http'
import { data } from 'autoprefixer'
let baseURL = process.env.VUE_APP_AUTH_API_PRODUCT
/* 描述模板 */
// 获取描述模板数据
export const getTemplateData = query => {
    return request({
        url: '/listing/config/template/attr',
        method: 'get',
        params: query
    })
}
