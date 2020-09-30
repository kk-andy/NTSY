module: [
    {
        name: '发货管理',
        icon: 'tree-table',
        url: '/deliverymanagement',
        menus: [
            {
                name: 'FBA订单',
                url: '/deliverymanagement/fbaorder',
                buttons: [

                ]
            }
        ]
    },
    {
        name: '采购管理',
        icon: 'tree-table',
        url: '/procurementmanagement',
        menus: [
            {
                name:'采购订单',
                url: '/procurementmanagement/procurementorder',
                buttons: [

                ]
            },
            {
                name: '入库单',
                url: '/procurementmanagement/putinstorageorder',
                buttons: [

                ]
            }
        ]
    },
    {
        name: '库存管理',
        icon: 'tree-table',
        url: '/stockManagement',
        menus: [
            {
                name: '盘点单',
                url: '/stockManagement/inventory',
                buttons: [

                ]
            },
            {
                name: '调拨单',
                url: '/stockManagement/transfers',
                buttons: [

                ]
            },
            {
                name: '出入库单据查询',
                url: '/stockManagement/outbound',
                buttons: [

                ]
            },
            {
                name: '库存数据',
                url: '/stockManagement/stockdata',
                buttons: [

                ]
            }
        ]
    },
    {
        name: 'FBA',
        icon: 'report',
        url: '/FBA',
        menus: [
            {
                name: '补货计划',
                url: '/FBA/replenishmentPlan',
                buttons: [

                ]
            },
            {
                name: '发货计划',
                url:'/FBA/shipmentsPlan',
                buttons: [

                ]
            },
            {
                name:'shipments',
                url: '/FBA/shipments',
                buttons: [

                ]
            },
            {
                name: '发货单',
                url: '/FBA/replenishmentPlan',
                buttons: [

                ]
            },
            {
                name: '头程跟踪',
                url: '/FBA/firstVessel',
                buttons: [

                ]
            },
            {
                name: 'FBA库存',
                url: '/FBA/FBAinventory',
                buttons: [

                ]
            }
        ]
    },
    {
        name: '数据权限',
        url: '/dataPermission',
        icons: 'tree-table',
        menus: [
            {
                name: '店铺权限配置',
                url: '/dataPermission/shopPermissionSetting',
                buttons: [

                ]
            }
        ]
    },
    {
        name: '基础资料',
        url: '/basisData',
        icons: '',
        menus: [
            {
                name: '仓库管理',
                url: '/basisData/warehousemanagement',
                buttons: [

                ]
            },
            {
                name: '店铺仓库绑定关系',
                url: '/basisData/warehousebindingstore',
                buttons: [

                ]
            }
        ]
    }
]