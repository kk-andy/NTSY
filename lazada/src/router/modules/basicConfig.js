import Layout from '@/layout'

const basicConfig = {
    path: '/basicConfig',
    component: Layout,
    redirect: '/basicConfig/accountNumber',
    alwaysShow: true,
    meta: {
        title: '基础配置',
        icon: 'basic-config',
    },
    children: [{
            path: 'accountNumber',
            component: () =>
                import (/* webpackChunkName: "accountNumber" */ '@/views/basicConfig/accountNumber'),
            name: 'AccountNumber',
            meta: { title: '账号店铺配置', noCache: true }
        },
        {
            path: 'categoryClass',
            component: () =>
                import (/* webpackChunkName: "CategoryClass" */ '@/views/basicConfig/CategoryClass'),
            name: 'CategoryClass',
            meta: { title: '分类映射配置', noCache: true }
        },
        {
            path: 'descriptionTemplate',
            component: () =>
                import (/* webpackChunkName: "descriptionTemplate" */ '@/views/basicConfig/descriptionTemplate'),
            name: 'DescriptionTemplate',
            meta: { title: '描述模板配置', noCache: true }
        },
    ]
}
export default basicConfig