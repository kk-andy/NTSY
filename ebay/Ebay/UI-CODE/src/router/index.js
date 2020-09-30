import Vue from 'vue'
import Router from 'vue-router'
import store from 'vuex'
Vue.use(Router)
/* Layout */
import Layout from '@/layout'


export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
        path: '/redirect/:path(.*)',
        component: () =>
            import('@/views/redirect/index')
    }]
},
{
    path: '/login',
    component: () =>
        import('@/views/login/index'),
    hidden: true
},
{
    path: '/auth-redirect',
    component: () =>
        import('@/views/login/auth-redirect'),
    hidden: true
},
{
    path: '/404',
    component: () =>
        import('@/views/error-page/404'),
    hidden: true
},
{
    path: '/401',
    component: () =>
        import('@/views/error-page/401'),
    hidden: true
},
{
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
        path: 'dashboard',
        component: () =>
            import('@/view/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true, noCache: true }
    }]
},
{
    path: '/productListing',
    component: Layout,
    redirect: '/productListing/listOfSelections',
    alwaysShow: true,
    meta: {
        title: '商品刊登',
        icon: 'lock',
        noCache: true
        // roles: ['admin', 'editor'] // 你可以在根导航中设置角色
    },
    children: [{
        path: 'listOfSelections',
        component: () =>
            import('@/view/ProductListing/ListOfSelections'),
        name: 'ListOfSelections',
        meta: { title: '刊登选品列表', icon: '', affix: false, noCache: false },
        // children: []
    },
    {
        hidden: true,
        path: 'createSelection',
        component: () =>
            import('@/view/ProductListing/Subpage/CreateSelection'),
        name: 'CreateSelection',
        meta: { title: '创建Listing', noCache: true }
    },
    {
        hidden: true,
        path: 'editSelection',
        component: () =>
            import('@/view/ProductListing/Subpage/EditSelection'),
        name: 'EditSelection',
        meta: { title: '编辑sku', noCache: false }
    },
    {
        path: 'listOfPublicationRecords',
        component: () =>
            import('@/view/ProductListing/ListOfPublicationRecords'),
        name: 'ListOfPublicationRecords',
        meta: { title: '刊登记录列表', icon: '', affix: false, noCache: true },

    },
    {
        path: 'pendingList',
        component: () =>
            import('@/view/ProductListing/PendingList'),
        name: 'PendingList',
        meta: { title: '待发布列表', icon: '', affix: false, noCache: false },

    }
    ]
},
{
    path: '/listingManagement',
    component: Layout,
    redirect: '/listingManagement/listingList',
    alwaysShow: true,
    meta: {
        title: 'listing管理',
        icon: 'tree-table',
    },
    children: [{
        path: 'listingList',
        component: () =>
            import('@/view/ListingManagement/ListingList'),
        name: 'ListingList',
        meta: { title: 'listing列表', noCache: true }
    },
    {
        path: 'dataSynList',
        component: () =>
            import('@/view/ListingManagement/DataSynList'),
        name: 'DataSynList',
        meta: { title: '数据同步列表', noCache: true }
    },
    {
        path: 'onlineSKUchangeList',
        component: () =>
            import('@/view/ListingManagement/OnlineSKUchangeList'),
        name: 'OnlineSKUchangeList',
        meta: { title: '在线SKU变更列表', noCache: true }
    },
    {
        hidden: true,
        path: 'listingEdit',
        component: () =>
            import('@/view/ProductListing/Subpage/ListingEdit'),
        name: 'ListingEdit',
        meta: { title: '编辑listing', noCache: false }
    },
    {
        hidden: true,
        path: 'copyListing',
        component: () =>
            import('@/view/ProductListing/Subpage/copyListing'),
        name: 'CopyListing',
        meta: { title: '复制listing', noCache: false }
    },
    {
        hidden: true,
        path: 'publicationRecordsEdit',
        component: () =>
            import('@/view/ProductListing/Subpage/PublicationRecordsEdit'),
        name: 'PublicationRecordsEdit',
        meta: { title: '编辑刊登记录', noCache: false }
    },
    {
        hidden: true,
        path: 'pendingEdit',
        component: () =>
            import('@/view/ProductListing/Subpage/pendingListEdit'),
        name: 'PendingEdit',
        meta: { title: '编辑待发布记录', noCache: false }
    },
    ]
},
{
    path: '/bargaining',
    component: Layout,
    alwaysShow: true,
    meta: {
        title: '议价管理',
        icon: 'bargaining'
    },
    redirect: '/bargaining/bargainingList',
    children: [
        {
            path: 'bargainingList',
            component: () => 
                import ('@/view/ListingManagement/Bargaining'),
            name: 'BargainingList',
            meta: { title: '议价列表', noCache: true }
        }
    ]
},
{
    path: '/marketing',
    component: Layout,
    redirect: '/marketing/relatedMarketing',
    alwaysShow: true,
    meta: {
        title: '营销管理',
        icon: 'tree-table',
    },
    children: [{
        path: 'relatedMarketing',
        component: () =>
            import('@/view/Marketing/relatedMarketing'),
        name: 'RelatedMarketing',
        meta: { title: '关联营销', noCache: false }
    }, {
        path: 'processingQueue',
        component: () =>
            import('@/view/Marketing/processingQueue'),
        name: 'ProcessingQueue',
        meta: { title: '处理队列', noCache: true }
    }, {
        path: 'createMarketing',
        component: () =>
            import('@/view/Marketing/createMarketing'),
        name: 'CreateMarketing',
        meta: { title: '创建/编辑关联营销', noCache: false },
        hidden: true,
        children: [{
            path: 'templatePage',
            component: () =>
                import('@/view/Marketing/templatePage'),
            name: 'TemplatePage',
            meta: { title: '模板页面', noCache: true },
            hidden: true,
        }]
    }, {
        path: 'designatedProduct',
        component: () =>
            import('@/view/Marketing/designatedProduct'),
        name: 'DesignatedProduct',
        meta: { title: '选择指定产品', noCache: true },
        hidden: true
    }]
},
{
    path: '/basicConfig',
    component: Layout,
    redirect: '/basicConfig/accountNumber',
    alwaysShow: true,
    meta: {
        title: '基础配置',
        icon: 'basic-config',
        noCache: true
    },
    children: [{
        path: 'accountNumber',
        component: () =>
            import('@/view/BasicConfig/AccountNumber'),
        name: 'AccountNumber',
        meta: { title: '账号配置', noCache: true }
    },
    {
        path: 'inventoryAdjustmentRules',
        component: () =>
            import('@/view/BasicConfig/InventoryAdjustmentRules'),
        name: 'InventoryAdjustmentRules',
        meta: { title: '库存调整规则配置', noCache: true }
    },
    {
        path: 'policyTemplate',
        component: () =>
            import('@/view/BasicConfig/PolicyTemplate'),
        name: 'PolicyTemplate',
        meta: { title: '政策模板配置', noCache: true }
    },

    {
        path: 'descriptionTemplate',
        component: () =>
            import('@/view/BasicConfig/DescriptionTemplate'),
        name: 'DescriptionTemplate',
        meta: { title: '描述模板配置', noCache: true }
    },
    {
        path: 'catalogSetting',
        component: () =>
            import('@/view/BasicConfig/CategoryClass'),
        name: 'CatalogSetting',
        meta: { title: '分类映射配置', noCache: true }
    },
    {
        hidden: true,
        path: 'addTemplate',
        component: () =>
            import('@/view/BasicConfig/Subpage/AddTemplate'),
        name: 'AddTemplate',
        meta: { title: '新增模板', noCache: true }
    },
    {
        hidden: true,
        path: 'editTemplate',
        component: () =>
            import('@/view/BasicConfig/Subpage/EditTemplate'),
        name: 'EditTemplate',
        meta: { title: '编辑模板', noCache: true }
    },
    {
        hidden: true,
        path: 'attrTemplate',
        component: () =>
            import('@/view/BasicConfig/Subpage/AttrTemplate'),
        name: 'AttrTemplate',
        meta: { title: '属性', noCache: true }
    }
    ]
},
{
    path: '/authorityManagement',
    alwaysShow: true,
    component: Layout,
    redirect: 'authorityManagement/dataPermission',
    meta: {
        title: '权限管理',
        icon: 'lock',
    },
    children: [{
        path: 'dataPermission',
        component: () =>
            import('@/view/AuthorityManagement/DataPermission'),
        name: 'DataPermission',
        meta: { title: '数据权限', noCache: true }
    },]
},
// 404页必须放在最后！
{ path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [

    /** 当您的路由图太长时，你可以将其拆分为小模块**/
    // componentsRouter,
    {
        path: '/error',
        component: Layout,
        redirect: 'noRedirect',
        hidden: true,
        name: 'ErrorPages',
        meta: {
            title: 'Error Pages',
            icon: '404'
        },
        children: [{
            path: '401',
            component: () =>
                import('@/views/error-page/401'),
            name: 'Page401',
            meta: { title: '401', noCache: true }
        },
        {
            path: '404',
            component: () =>
                import('@/views/error-page/404'),
            name: 'Page404',
            meta: { title: '404', noCache: true }
        }
        ]
    },


]

const createRouter = () => new Router({
    mode: 'history', // 需要服务支持
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// 添加路由守卫
router.beforeEach((to, from, next) => {
    const href = window.location.href;
    if (sessionStorage.getItem('token')) {
        if (href.indexOf('token') != -1) {
            next();
        } else {
            // 如果有正常执行
            next();
        }
    } else if (href.indexOf('token') != -1) {
        let token = location.href.replace(/^.+token\=([^&#?]+).*$/g, '$1')
        let appId = location.href.replace(/^.+id\=([\d]+).*$/g, '$1')
        if (!token || !appId) {
            sessionStorage.clear()
            window.location.href = _g.getLastDomain();
            return;
        }
        next()
        // _g.redirectRoute('')
    } else {
        sessionStorage.clear()
        window.location.href = _g.getLastDomain();
    }
    // sessionStorage.setItem('token', 'a12d93b02fde7557dd7aa61173fdc276809b25d823d5b3d7a8807782ce4bbab7'),
    //     sessionStorage.setItem('subId', 2)
    // next()
})

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router