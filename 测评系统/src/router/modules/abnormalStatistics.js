import Layout from '@/layout'

const abnormalStatisticsRouter = {
    path: '/abnormalStatistics',
    component: Layout,
    redirect: '/user',
    alwaysShow: true,
    meta: {
        title: '异常统计',
        icon: 'user'
    },
    children: [{
        path: 'abnormalFile',
        component: () =>
            import('@/views/abnormalStatistics/abnormalFile'),
        name: 'AbnormalFile',
        meta: { title: '异常归档', noCache: true }
    },
    {
        path: 'refundaudit',
        component: () =>
            import('@/views/abnormalStatistics/refundaudit'),
        name: 'Refundaudit',
        hidden: true,
        meta: { title: '返款审核', noCache: true }
    },
    ]
}
export default abnormalStatisticsRouter