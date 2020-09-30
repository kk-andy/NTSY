import request from '@/utils/request'
const baseURL = process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_AMAZON_PHP
//临时全部站点
export function reqGetSite(arg) {
  return request({
    url: "/api/basic/sites",
    method: "get",
    params: arg,
    baseURL
  })
}
//临时全部店铺
export function reqGetShop(arg) {
  return request({
    url: "/api/basic/shops",
    method: "get",
    params: arg,
    baseURL
  })
}
//拉取补货单
export function reqGetReplenishmentPlan(arg) {
  return request({
    url: "/api/fba/purchase_list",
    method: "post",
    data: arg,
    baseURL
  })
}
//导出补货单
export function reqExportReplenishmentPlan(arg) {
  return request({
    url: "/api/fba/apply_export",
    method: 'get',
    responseType: 'blob',
    params: arg,
    baseURL
  })
}

//获取 OA员工列表
export function reqGetOAUserList(arg) {
  return request({
    url: "/api/basic/oa_staffs",
    method: "get",
    params: arg,
    baseURL
  })
}
//获取发货详情
export function reqGetShipmentsInfo(arg) {
  return request({
    url: "/api/fba/apply_info",
    method: "get",
    params: arg,
    baseURL
  })
}
//获取运输方式
export function reqGetLogistics(arg) {
  return request({
    url: "/api/basic/shipping_type",
    method: "get",
    params: arg,
    baseURL
  })
}
//补货计划生成发货计划发布
export function reqSendShipmentsShip(arg) {
  return request({
    url: "/api/fba/apply_gen_shipment",
    method: "post",
    data: arg,
    baseURL
  })
}
//---------发货计划
//发货计划table
export function reqGetShipmentsPlan(arg) {
  return request({
    url: "/api/fba/shipment_plan_list",
    method: "post",
    data: arg,
    baseURL
  })
}
//发货计划详情table
export function reqGetShipmentDetail(arg) {
  return request({
    url: "/api/fba/shipment_info",
    method: "get",
    params: arg,
    baseURL
  })
}
//根据店铺获取虚拟仓
export function getWarehouseFromShop(arg) {
  return request({
    url: "/api/fba/virtualwarehouse_shop",
    method: "get",
    params: arg,
    baseURL
  })
}
//更新货添加发货计划
export function addUpdateShipmentsPlan(arg) {
  return request({
    url: "/api/fba/shipment_add_update",
    method: "post",
    data: arg,
    baseURL
  })
}
//删除发货计划
export function deleteShipmentsPlan(arg) {
  return request({
    url: "/api/fba/del_shipment_plan",
    method: "get",
    params: arg,
    baseURL
  })
}
//根据品名和sku获取sku
export function reqGetSku(arg) {
  return request({
    url: "/api/fba/sku_list",
    method: "get",
    params: arg,
    baseURL
  })
}
//下载添加sku模板
export function downLoadSkuTemplate(arg) {
  return request({
    url: "/api/fba/download_shipment_sku_template",
    method: "get",
    params: arg,
    baseURL
  })
}
//创建货件
export function reqCreateShipmentsPlan(arg) {
  return request({
    url: "/api/fba/create_shipment_plan",
    method: "post",
    data: arg,
    baseURL
  })
}
//货件名称唯一性验证
export function reqDetectionName(arg) {
  return request({
    url: "/api/fba/check_inbound_name",
    method: "get",
    params: arg,
    baseURL
  })
}
//获取拣货单信息
export function reqGetBill(arg) {
  return request({
    url: "/api/fba/plan_pick_info",
    method: "get",
    params: arg,
    baseURL
  })
}
//保存拼箱编码
export function reqSaveBoxCode(arg) {
  return request({
    url: "/api/fba/plan_update_box_code",
    method: "post",
    data: arg,
    baseURL
  })
}


// //根据sku获取店铺下sku
// export function getSkuFromSku(arg) {
//   return request({
//     url: "/api/fba/sku_list",
//     method: "get",
//     params: arg,
//     baseURL
//   })
// }
// //根据品名获取店铺下sku
// export function getSkuFromTitle(arg) {
//   return request({
//     url: "/api/fba/product_list",
//     method: "get",
//     params: arg,
//     baseURL
//   })
// }
//-------------------shipments
//shipments获取列表
export function getShipments(arg) {
  return request({
    url: "/api/fba/inbound_list",
    method: "post",
    data: arg,
    baseURL
  })
}
//获取shipments详情
export function reqGetShipmentsDetail(arg) {
  return request({
    url: "/api/fba/inbound_info",
    method: "get",
    params: arg,
    baseURL
  })
}
//手动同步货件
export function reqSyncFromUser(arg) {
  return request({
    url: "/api/fba/update_shipment",
    method: "get",
    params: arg,
    baseURL
  })
}
//更新物流信息
export function reqUpdataLogisticsInfo(arg) {
  return request({
    url: "/api/fba/update_inbound_logistics_info",
    method: "post",
    data: arg,
    baseURL
  })
}
//更新包装信息
export function reqUpdataInboundPackInfo(arg) {
  return request({
    url: "/api/fba/update_inbound_pack_info",
    method: "post",
    data: arg,
    baseURL
  })
}
//获取头程费用
export function reqGetFirstFee(arg) {
  return request({
    url: "/api/fba/invoice_first_leg_fee",
    method: "post",
    data: arg,
    baseURL
  })
}
//获取箱子标签
export function reqGetBoxTitle(arg) {
  return request({
    url: "/api/fba/inbound_labels",
    method: "get",
    params: arg,
    baseURL
  })
}
//标记发货
export function signShipments(arg) {
  return request({
    url: "/api/fba/mark_inbound_shipped",
    method: "get",
    params: arg,
    baseURL
  })
}
//作废
export function reqCancellation(arg) {
  return request({
    url: "/api/fba/void_inbound",
    method: "get",
    params: arg,
    baseURL
  })
}
//----------------头程跟踪
//获取列表
export function getFirstVessel(arg) {
  return request({
    url: "/api/fba/invoice_firstleg_list",
    method: "post",
    data: arg,
    baseURL
  })
}
//导出
export function exportFirstVessel(arg) {
  return request({
    url: "/api/fba/export_first_leg",
    method: "get",
    params: arg,
    responseType: 'blob',
    baseURL
  })
}
//获取承运商
export function reqGetCarrier(arg) {
  return request({
    url: "/api/basic/logistics_carrier",
    method: "get",
    params: arg,
    baseURL
  })
}
//---------------------发货单
//获取发货单
export function reqGetShipmentsBill(arg) {
  return request({
    url: "/api/fba/invoice_list",
    method: "post",
    data: arg,
    baseURL
  })
}
//获取物流信息
export function reqGetTransport(arg) {
  return request({
    url: "/api/fba/invoice_logistics_info",
    method: "get",
    params: arg,
    baseURL
  })
}
//更新物流信息
export function reqUpdateTransport(arg) {
  return request({
    url: "/api/fba/invoice_set_logistics",
    method: "post",
    data: arg,
    baseURL
  })
}
//导出
export function reqExportFreight(arg) {
  return request({
    url: "/api/fba/invoice_export",
    method: "get",
    responseType: 'blob',
    params: arg,
    baseURL
  })
}
//获取报关信息
export function reqGetClearanceInfo(arg) {
  return request({
    url: "/api/fba/invoice_customs_declaration",
    method: "get",
    params: arg,
    baseURL
  })
}
//保存报关信息
export function reqSaveClearanceInfo(arg) {
  return request({
    url: "/api/fba/invoice_save_customs_declaration",
    method: "post",
    data: arg,
    baseURL
  })
}
//获取拣货单
export function reqGetPickingList(arg) {
  return request({
    url: "/api/fba/invoice_picking_list",
    method: "get",
    params: arg,
    baseURL
  })
}
//获取发票信息
export function reqGetBillInfo(arg) {
  return request({
    url: "/api/fba/invoice_bill_info",
    method: "get",
    params: arg,
    baseURL
  })
}
// 保存物流询价反馈
export function saveLogistics(data) {
  return request({
    url: "/api/fba/save_logistics_inquiry",
    method: "POST",
    data,
    baseURL
  })
}
/* 确认发货 */
export function confirmShipped(params) {
  return request({
    url: "/api/fba/confirm_shipped",
    method: "get",
    params,
    baseURL
  })
}