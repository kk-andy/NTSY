import Layout from '@/layout'

const salesReports = {
    path: '/salesReports',
    component: Layout,
    redirect: '/salesReports/salesReportsList',
    alwaysShow: true,
    meta: {
        title: '销售额报表',
        icon: 'report',
    },
    children: [{
        path: 'salesReportsList',
        component: () =>
            import ('@/views/salesReports'),
        name: 'SalesReportsList',
        meta: { title: '销售额报表', noCache: true }
    }, ]
}
export default salesReports