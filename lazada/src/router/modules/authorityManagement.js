import Layout from '@/layout'

const authorityManagement = {
    path: '/authorityManagement',
    component: Layout,
    redirect: '/authorityManagement/dataPermission',
    alwaysShow: true,
    meta: {
        title: '权限管理',
        icon: 'lock',
    },
    children: [{
        path: 'dataPermission',
        component: () =>
            import (/* webpackChunkName: "dataPermission" */ '@/views/authorityManagement/dataPermission'),
        name: 'DataPermission',
        meta: { title: '数据权限', noCache: true }
    }]
}
export default authorityManagement