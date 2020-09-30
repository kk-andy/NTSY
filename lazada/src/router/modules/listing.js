import Layout from '@/layout'

const listing = {
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
                import (/* webpackChunkName: "listingList" */ '@/views/listing/listingList'),
            name: 'ListingList',
            meta: { title: 'listing列表', noCache: true }
        },
        {
            path: 'dataSynList',
            component: () =>
                import (/* webpackChunkName: "dataSynList" */ '@/views/listing/dataSynList'),
            name: 'DataSynList',
            meta: { title: '数据同步列表', noCache: true }
        },
        {
            path: 'listingEdit',
            component: () => 
                import (/* webpackChunkName: "listingEdit" */ '@/views/createListing/listingEdit'),
            name: 'ListingEdit',
            hidden: true,
            meta: { title: 'listing编辑', noCache: true }
        },
        {
            path: 'copyListing',
            component: () => 
                import (/* webpackChunkName: "copyListing" */ '@/views/createListing/copyListing'),
            name: 'CopyListing',
            hidden: true,
            meta: { title: '复制Listing', noCache: true }
        }
    ]
}
export default listing