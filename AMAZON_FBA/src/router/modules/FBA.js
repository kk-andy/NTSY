import Layout from '@/layout'



const FBA = {
  path: '/FBA',
  component: Layout,
  redirect: '/FBA/replenishmentPlan',
  alwaysShow: true,
  meta: {
    title: 'FBA',
    icon: 'report',
  },
  children: [{
      path: 'replenishmentPlan',
      component: () => import("@/views/FBA/replenishmentPlan"),
      name: 'replenishmentPlan',
      meta: { title: '补货计划', noCache: true },
    },
    {
      path: "NewShipmentsPlan",
      component: () => import("@/views/FBA/replenishmentPlan/NewShipmentsPlan"),
      name: "NewShipmentsPlan",
      meta: { title: "生成发货计划", noCache: true },
      hidden: true
    },
    //------

    {
      path: 'shipmentsPlan',
      component: () => import("@/views/FBA/shipmentsPlan"),
      name: "shipmentsPlan",
      meta: { title: '发货计划', noCache: true }
    },
    {
      path: "createParcel",
      component: () => import("@/views/FBA/shipmentsPlan/createParcel"),
      name: "createParcel",
      meta: { title: '创建货件', noCache: true },
      hidden: true
    },
    {
      path: 'PrintShipmentsPlan',
      component: () => import("@/views/FBA/shipmentsPlan/PrintShipmentsPlan"),
      name: "PrintShipmentsPlan",
      meta: { title: '打印发货计划', noCache: true },
      hidden: true
    },
    {
      path: 'PrintBrandLabel',
      component: () => import("@/views/FBA/shipmentsPlan/PrintBrandLabel"),
      name: "PrintBrandLabel",
      meta: { title: '打印商品标签', noCache: true },
      hidden: true
    },
    // {
    //   path: 'CreateShipmentsPlan',
    //   component: () => import("@/views/FBA/shipmentsPlan/CreateShipmentsPlan"),
    //   name: "CreateShipmentsPlan",
    //   meta: { title: '新增发货计划', noCache: true },
    //   hidden: true
    // },
    {
      path: 'ShipmentsPlanDetail',
      component: () => import("@/views/FBA/shipmentsPlan/ShipmentsPlanDetail"),
      name: "ShipmentsPlanDetail",
      meta: { title: '发货计划详情', noCache: true },
      hidden: true
    },
    {
      path: 'EditShipmentsPlan',
      component: () => import("@/views/FBA/shipmentsPlan/EditShipmentsPlan"),
      name: "EditShipmentsPlan",
      meta: { title: '详情编辑', noCache: true },
      hidden: true
    },
    {
      path: 'InsertFromUser',
      component: () => import("@/views/FBA/shipmentsPlan/InsertFromUser"),
      name: "InsertFromUser",
      meta: { title: '商品添加', noCache: true },
      hidden: true
    },
    {
      path: 'InsertFromExcel',
      component: () => import("@/views/FBA/shipmentsPlan/InsertFromExcel"),
      name: "InsertFromExcel",
      meta: { title: 'EXCEL导入商品', noCache: true },
      hidden: true
    },
    //-------
    {
      path: 'shipments',
      component: () => import("@/views/FBA/shipments"),
      name: "shipments",
      meta: { title: 'shipments', noCache: true }
    },
    {
      path: "shipmentsDetail",
      component: () => import("@/views/FBA/shipments/shipmentsDetail"),
      name: "shipmentsDetail",
      meta: { title: 'shipments详情', noCache: true },
      hidden: true
    },
    {
      path: "shipmentsPrintBox",
      component: () => import("@/views/FBA/shipments/shipmentsPrintBox"),
      name: "shipmentsPrintBox",
      meta: { title: '打印箱子标签', noCache: true },
      hidden: true
    },
    //------
    {
      path: 'shipmentsBill',
      component: () => import("@/views/FBA/shipmentsBill"),
      name: "shipmentsBill",
      meta: { title: '发货跟踪', noCache: true }
    },
    {
      path: "shipmentsBillDetail",
      component: () => import("@/views/FBA/shipmentsBill/shipmentsBillDetail"),
      name: "shipmentsBillDetail",
      meta: { title: '发货单详情', noCache: true },
      hidden: true
    },
    {
      path: "importFreight",
      component: () => import("@/views/FBA/shipmentsBill/importFreight"),
      name: "importFreight",
      meta: { title: '导入运费及跟踪号', noCache: true },
      hidden: true
    },
    {
      path: "importPayAmountTime",
      component: () => import("@/views/FBA/shipmentsBill/importPayAmountTime"),
      name: "importPayAmountTime",
      meta: { title: '导入付款时间及金额', noCache: true },
      hidden: true
    },
    //-----
    {
      path: 'firstVessel',
      component: () => import("@/views/FBA/firstVessel"),
      name: "firstVessel",
      meta: { title: '头程跟踪', noCache: true }
    },
    {
      path: 'FBAinventory',
      component: () => import("@/views/FBA/FBAinventory"),
      name: "FBAinventory",
      meta: { title: 'FBA库存', noCache: true }
    }
  ]
}
export default FBA