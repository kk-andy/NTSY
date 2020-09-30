export const menuName = (path) => {
    switch (path) {
        case 'fbaoverseas':
            return 'FBAoverseas';
        case 'international':
            return 'International'
        case 'operationgo':
            return 'Purchasetoexamine'
        case 'purchasego': //采购申购
            return 'Shengowhole'
        case 'operateLeaderExamine': //
            return 'OperateLeaderExamine'
        case 'budgetExamine': //
            return 'BudgetExamine'
        case 'purchaseLeaderExamine': //采购主管审核
            return 'PurchaseLeaderExamine'
        case 'process': //
            return 'Process'
        case 'merge': //采购合并单
            return 'Merge'
        case 'financialbudget':
            return 'Financialbudget'
        case 'salesteambudget': //销售组内资金预算
            return 'Salesteambudget'
        case 'permissionconfig':
            return 'Permissionconfig'
        case 'replenishmentconfig':
            return 'Replenishmentconfig'
        case 'freightchannelconfig':
            return 'Freightchannelconfig'
        case 'productprocesslist':
            return 'Productprocesslist'
        case 'replenishmentstrategyconfig':
            return 'Replenishmentstrategyconfig'
        case 'warehouseaddressconfig':
            return 'Warehouseaddressconfig'
        case 'warehousebindingconfig':
            return 'Warehousebindingconfig'
        case 'shutdownSKUconfig': //店铺停备SKU配置
            return 'ShutdownSKUconfig'
    }
}