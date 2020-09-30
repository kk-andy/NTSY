import request from '@/utils/http'
import { data } from 'autoprefixer'
export const getDevelperList = () => {
    return request({
        url: '/listing/info/develper_list',
        method: 'get'
    })
}
export const Test = data => {
    return request({
        url: '/listing/marketing/add',
        method: 'post',
        data
    })
}