import Layout from '@/layout'

const releaseManagementRouter = {
    path: '/releaseManagement',
    component: Layout,
    redirect: '/user',
    meta: {
        title: '订单管理',
        icon: 'user'
    },
    children: [{
        path: 'evaluationOrder',
        component: () =>
            import('@/views/releaseManagement/evaluationOrder'),
        name: 'EvaluationOrder',
        meta: {
            title: '测评下单',
            noCache: true
        }
    }, {
        path: 'logisticsTracking',
        component: () =>
            import('@/views/releaseManagement/logisticsTracking'),
        name: 'LogisticsTracking',
        meta: {
            title: '物流跟踪',
            noCache: true
        }
    }, {
        path: 'leaveReviewTracking',
        component: () =>
            import('@/views/releaseManagement/leaveReviewTracking'),
        name: 'LeaveReviewTracking',
        meta: {
            title: '留评跟踪',
            noCache: true
        }
    }, {
        path: 'operationalEvaluation',
        component: () =>
            import('@/views/releaseManagement/operationalEvaluation'),
        name: 'OperationalEvaluation',
        meta: {
            title: '运营核评',
            noCache: true
        }
    }, {
        path: 'evaluationOrderEdit',
        component: () =>
            import('@/views/releaseManagement/edit/evaluationOrderEdit'),
        name: 'EvaluationOrderEdit',
        meta: {
            title: '评测下单编辑',
            noCache: true
        },
        hidden: true,
    }, {
        path: 'logisticsTrackingEdit',
        component: () =>
            import('@/views/releaseManagement/edit/logisticsTrackingEdit'),
        name: 'LogisticsTrackingEdit',
        meta: {
            title: '物流跟踪编辑',
            noCache: true
        },
        hidden: true,
    }, {
        path: 'leaveReviewTrackingEdit',
        component: () =>
            import('@/views/releaseManagement/edit/leaveReviewTrackingEdit'),
        name: 'LeaveReviewTrackingEdit',
        meta: {
            title: '留评跟踪编辑',
            noCache: true
        },
        hidden: true,
    }, {
        path: 'operationalEvaluationEdit',
        component: () =>
            import('@/views/releaseManagement/edit/operationalEvaluationEdit'),
        name: 'OperationalEvaluationEdit',
        meta: {
            title: '运营核评编辑',
            noCache: true
        },
        hidden: true,
    }, ]
}
export default releaseManagementRouter
