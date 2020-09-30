import Layout from '@/layout'
const ProcurementManagement = {
    path: '/procurementmanagement',
    redirect: '/procurementmanagement/procurementorder',
    component: Layout,
    alwaysShow: true,
    meta: {
        title: '采购管理',
        icon: 'tree-table',
    },
    children: [
        {
            path: 'procurementorder',
            component: () => import (/* webpackChunkName: "Procurementorder" */ '@/views/ProcurementManagement/Procurementorder'),
            name: 'Procurementorder',
            meta: { title: '采购订单', noCache: true }
        },
        {
            path: 'putinstorage',
            component: () => import (/* webpackChunkName: 'StorageContent' */ '@/views/ProcurementManagement/StorageContent'),
            name: 'StorageContent',
            hidden: true,
            meta: {
                title: '采购单入库',
                noCache: true
            }
        },
        {
            path: 'putinstorageorder',
            component: () => import (/* webpackChunkName: "PutInStorageOrder" */ '@/views/ProcurementManagement/PutInStorageOrder'),
            name: 'PutInStorageOrder',
            meta: { title: '入库管理', noCache: true }
        },
        {
            path: 'putinstorageconent',
            component: () => import (/* webpackChunkName: "PutInStorageConent" */ '@/views/ProcurementManagement/PutInStorageConent'),
            name: 'PutInStorageConent',
            meta: { title: '质检入库', noCache: true },
            hidden: true
        }
    ]
}
export default ProcurementManagement