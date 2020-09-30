import Layout from '@/layout'
const DeliveryManagement = {
    path: '/deliverymanagement',
    redirect: '/deliverymanagement/fbaorder',
    component: Layout,
    alwaysShow: true,
    meta: {
        title: '发货管理',
        icon: 'tree-table',
    },
    children: [{
            path: 'fbaorder',
            component: () =>
                import (/* webpackChunkName: "DeliveryManagement" */ '@/views/DeliveryManagement'),
            name: 'FBAOrder',
            meta: { title: 'FBA订单', noCache: true }
        },
        {
            path: 'ordercontent',
            component: () =>
                import (/* webpackChunkName: "contentData" */ '@/views/DeliveryManagement/contentData'),
            name: 'Ordercontent',
            hidden: true,
            meta: { title: 'FBA订单', noCache: true }
        }
    ]
}
export default DeliveryManagement