import Layout from '@/layout'
const InitialData = {
  path: '/InitialData',
  redirect: '/InitialData/firstVesselLogistics',
  component: Layout,
  alwaysShow: true,
  meta: {
    title: '基础资料',
    icon: 'basic-config',
  },
  children: [
    {
      path: 'firstVesselLogistics',
      component: () => import('@/views/InitialData/firstVesselLogistics'),
      name: 'WarehouseManagement',
      meta: { title: '头程物流', noCache: true }
    },
    {
      path: 'maintainShippingType',
      component: () => import('@/views/InitialData/maintainShippingType'),
      name: 'maintainShippingType',
      meta: { title: '运输方式维护', noCache: true }
    },
    {
      path: 'maintainLogisticsType',
      component: () => import('@/views/InitialData/maintainLogisticsType'),
      name: 'maintainLogisticsType',
      meta: { title: '物流方式维护', noCache: true }
    },
    {
      path: 'maintainLogisticsProvider',
      component: () => import('@/views/InitialData/maintainLogisticsProvider'),
      name: 'maintainLogisticsProvider',
      meta: { title: '物流商维护', noCache: true }
    },

  ]
}
export default InitialData