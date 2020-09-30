import Layout from '@/layout'

const productPublished = {
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
                import (/* webpackChunkName: "listOfSelections" */ '@/views/productListing/listOfSelections'),
            name: 'ListOfSelections',
            meta: { title: '刊登选品列表', icon: '', affix: false, noCache: true },
        },
        {
            path: 'listOfSelectionsEdit',
            component: () =>
                import (/* webpackChunkName: "createListing" */ '@/views/createListing/createListing'),
            name: 'ListOfSelectionsEdit',
            meta: { title: '刊登选品编辑', icon: '', affix: false, noCache: true },
            hidden: true
        },
        {
            path: 'listOfPublicationRecordsEdit',
            component: () =>
                import (/* webpackChunkName: "listOfPublicationRecordsEdit" */ '@/views/createListing/listOfPublicationRecordsEdit'),
            name: 'ListOfPublicationRecordsEdit',
            meta: { title: '刊登记录编辑', icon: '', affix: false, noCache: true },
            hidden: true
        },
        {
            path: 'listOfPublicationRecords',
            component: () =>
                import (/* webpackChunkName: "listOfPublicationRecords" */ '@/views/productListing/listOfPublicationRecords'),
            name: 'ListOfPublicationRecords',
            meta: { title: '刊登记录列表', icon: '', affix: false, noCache: true },

        }
    ]
}
export default productPublished