import request from '@/utils/request'

/* 底图异常 */

// 获取列表
export const getList = (query) => {
        return request({
            url: '/api/v1/abnormal/rIndex',
            method: 'get',
            params: query
        })
    }
    // 重新提交作图
export const drawingAgain = data => {
    return request({
        url: '/api/v1/abnormal/resubmit',
        method: 'post',
        data
    })
}