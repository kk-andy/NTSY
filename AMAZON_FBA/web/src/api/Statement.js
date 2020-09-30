import request from '@/utils/request'
const baseURL = process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_AMAZON_PHP
//签收差异报表
export function reqGetSignDiffList(arg) {
  return request({
    url: "/api/fba/report_diversity_list",
    method: 'post',
    data: arg,
    baseURL
  })
}
//导出差异报表
export function reqExportSignDiff(arg) {
  return request({
    url: '/api/fba/export_diversity_list',
    method: "get",
    params: arg,
    responseType: 'blob',
    baseURL
  })
}