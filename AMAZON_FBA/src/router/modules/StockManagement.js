import Layout from '@/layout'
const StockManagement = {
    path: '/stockManagement',
    redirect: '/stockManagement/Inventory',
    component: Layout,
    alwaysShow: true,
    meta: {
        title: '库存管理',
        icon: 'tree-table',
    },
    children: [
        {
            path: 'inventory',
            component: () => import (/* webpackChunkName: "Inventory" */ '@/views/StockManagement/Inventory'),
            name: 'Inventory',
            meta: { title: '盘点单', noCache: true }
        },
        {
            path: 'addinventory',
            component: () => import (/* webpackChunkName: 'addinventory' */ '@/views/StockManagement/AddInventory'),
            name: 'AddInventory',
            meta: {
                title: '新增盘点',
                noCache: true
            },
            hidden: true
        },
        {
            path: 'editinventory',
            component: () => import (/* webpackChunkName: 'EditInventory' */ '@/views/StockManagement/EditInventory'),
            name: 'Editinventory',
            meta: {
                title: '修改盘点',
                noCache: true
            },
            hidden: true
        },
        {
            path: 'transfers',
            component: () => import (/* webpackChunkName: 'Transfers' */ '@/views/StockManagement/Transfers'),
            name: 'Transfers',
            meta: {
                title: '调拨单',
                noCache: true
            }
        },
        {
            path: 'addtransfers',
            component: () => import (/* webpackChunkName: 'AddTransfers' */ '@/views/StockManagement/AddTransfers'),
            name: 'AddTransfers',
            meta: {
                title: '新增调拨单',
                noCache: true
            },
            hidden: true
        },
        {
            path: 'edittransfers',
            component: () => import (/* webpackChunkName: 'EditTransfers' */ '@/views/StockManagement/EditTransfers'),
            name: 'EditTransfers',
            meta: {
                title: '修改调拨单',
                noCache: true
            },
            hidden: true
        },
        {
            path: 'outbound',
            component: () => import (/* webpackChunkName: "Outbound" */ '@/views/StockManagement/Outbound'),
            name: 'Outbound',
            meta: { title: '出入库单据查询', noCache: true }
        },
        {
            path: 'outboundcontent',
            component: () => import (/* webpackChunkName: "OutboundContent" */ '@/views/StockManagement/OutboundContent'),
            name: 'OutboundContent',
            meta: { title: '出入库单据详情', noCache: true },
            hidden: true
        },
        {
            path: 'stockdata',
            component: () => import (/* webpackChunkName: "StockData" */ '@/views/StockManagement/StockData'),
            name: 'StockData',
            meta: { title: '库存数据', noCache: true },
        }
    ]
}
export default StockManagement