import Layout from '@/layout'

const demandManagementRouter = {
    path: '/demandManagement',
    component: Layout,
    redirect: '/user',
    meta: {
        title: '需求管理',
        icon: 'user'
    },
    children: [{
        path: 'demandList',
        component: () =>
            import('@/views/demandManagement/demandList'),
        name: 'DemandList',
        meta: { title: '需求列表', noCache: true }
    },
    {
        path: 'demandAudit',
        component: () =>
            import('@/views/demandManagement/demandAudit'),
        name: 'DemandAudit',
        meta: { title: '审核派发', noCache: true }
    },
    {
        path: 'addDemand',
        component: () =>
            import('@/views/demandManagement/addDemand'),
        name: 'AddDemand',
        meta: { title: '新增需求', noCache: true },
        hidden: true,
    },
    {
        path: 'auditDetail',
        component: () =>
            import('@/views/demandManagement/auditDetail'),
        name: 'AuditDetail',
        meta: { title: '需求详情', noCache: true },
        hidden: true,
    }
    ]
}
export default demandManagementRouter