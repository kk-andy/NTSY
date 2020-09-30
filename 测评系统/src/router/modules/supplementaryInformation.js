import Layout from '@/layout'

const supplementaryInformationRouter = {
    path: '/supplementaryInformation',
    component: Layout,
    redirect: '/user',
    meta: {
        title: '辅助信息',
        icon: 'user'
    },
    children: [{
        path: 'buyerAccount',
        component: () =>
            import('@/views/supplementaryInformation/buyerAccount'),
        name: 'BuyerAccount',
        meta: { title: '买家号库', noCache: true }
    },
    {
        path: 'creditCard',
        component: () =>
            import('@/views/supplementaryInformation/creditCard'),
        name: 'CreditCard',
        meta: { title: '信用卡库', noCache: true }
    },
    {
        path: 'serviceItems',
        component: () =>
            import('@/views/supplementaryInformation/serviceItems'),
        name: 'ServiceItems',
        meta: { title: '服务项目价卡', noCache: true }
    },
    {
        path: 'addservice',
        component: () =>
            import('@/views/supplementaryInformation/addservice'),
        name: 'AddService',
        hidden: true,
        meta: { title: '服务项目价卡', noCache: true }
    },
    {
        path: 'addCreditCard',
        component: () =>
            import('@/views/supplementaryInformation/addCreditCard'),
        name: 'AddCreditCard',
        hidden: true,
        meta: { title: '信用卡库', noCache: true }
    },
    {
        path: 'addbuyer',
        component: () =>
            import('@/views/supplementaryInformation/addbuyer'),
        name: 'Addbuyer',
        hidden: true,
        meta: { title: '买家号库', noCache: true }
    },
    ]
}
export default supplementaryInformationRouter