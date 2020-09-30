import Layout from '@/layout'

const recordStatisticsRouter = {
    path: '/recordStatistics',
    component: Layout,
    redirect: '/user',
    alwaysShow: true,
    meta: {
        title: '记录统计',
        icon: 'user'
    },
    children: [{
        path: 'evaluationCompleted',
        component: () =>
            import('@/views/recordStatistics/evaluationCompleted'),
        name: 'EvaluationCompleted',
        meta: { title: '测评完成', noCache: true }
    },
    ]
}
export default recordStatisticsRouter