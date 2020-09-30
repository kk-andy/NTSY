import Layout from '@/layout'
const BasisData = {
    path: '/basisData',
    redirect: '/basisData/warehousemanagement',
    component: Layout,
    alwaysShow: true,
    meta: {
        title: '基础资料',
        icon: 'basic-config',
    },
    children: [
        {
            path: 'warehousemanagement',
            component: () => import (/* webpackChunkName: "WarehouseManagement" */ '@/views/BasisData'),
            name: 'WarehouseManagement',
            meta: { title: '仓库配置', noCache: true }
        },
        {
            path: 'warehousedata',
            component: () => import (/* webpackChunkName: 'WarehouseData' */ '@/views/BasisData/WarehouseData'),
            name: 'WarehouseData',
            meta: {
                title: '仓库信息',
                noCache: true
            },
            hidden: true
        },
        {
            path: 'editthelocation',
            component: () => import (/* webpackChunkName: 'EdittheLocation' */ '@/views/BasisData/EdittheLocation'),
            name: 'EdittheLocation',
            meta: {
                title: '编辑库位',
                noCache: true
            },
            hidden: true
        },
        {
            path: 'warehousebindingstore',
            component: () => import (/* webpackChunkName: '' */ '@/views/BasisData/WerhourseAndShop'),
            name: 'WerhourseAndShop',
            meta: {
                title: '店铺绑定',
                noCache: true
            }
        }
    ]
}
export default BasisData