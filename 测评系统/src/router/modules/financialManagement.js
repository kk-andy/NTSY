import Layout from '@/layout'

const financialManagementRouter = {
    path: '/financialManagement',
    component: Layout,
    redirect: '/user',
    meta: {
        title: '财务管理',
        icon: 'user'
    },
    children: [{
        path: 'rebateOperation',
        component: () =>
            import('@/views/financialManagement/rebateOperation'),
        name: 'RebateOperation',
        meta: { title: '返款操作', noCache: true }
    },
    {
        path: 'onceAgainRebate',
        component: () =>
            import('@/views/financialManagement/onceAgainRebate'),
        name: 'OnceAgainRebate',
        meta: { title: '二次返款', noCache: true }
    },
    {
        path: 'creditCardRecharge',
        component: () =>
            import('@/views/financialManagement/creditCardRecharge'),
        name: 'CreditCardRecharge',
        meta: { title: '信用卡充值', noCache: true }
    },
    {
        path: 'rebateOperationEdit',
        component: () =>
            import('@/views/financialManagement/edit/rebateOperationEdit'),
        name: 'RebateOperationEdit',
        meta: { title: '返款操作编辑', noCache: true },
        hidden: true,
    },
    {
        path: 'onceAgainRebateEdit',
        component: () =>
            import('@/views/financialManagement/edit/onceAgainRebateEdit'),
        name: 'OnceAgainRebateEdit',
        meta: { title: '二次返款编辑', noCache: true },
        hidden: true,
    },
    {
        path: 'creditCardRechargeEdit',
        component: () =>
            import('@/views/financialManagement/edit/creditCardRechargeEdit'),
        name: 'CreditCardRechargeEdit',
        meta: { title: '信用卡充值编辑', noCache: true },
        hidden: true,
    }
    ]
}
export default financialManagementRouter