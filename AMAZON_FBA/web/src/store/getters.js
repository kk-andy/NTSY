import { getMenus } from '@/utils/auth'
const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    avatar: state => state.common.avatar,
    name: state => state.common.staffName,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    warehouseList: state => state.common.warehouseList,
    warehouseTypeList: state => state.common.warehouseTypeList,
    purchaseOrderList: state => state.common.purchaseOrderList,
    siteCodeList: state => state.common.siteCodeList,
    shopList: state => state.common.shopList,
    documentsTypeList: state => state.common.documentsTypeList,
    transitWarehoureList: state => state.common.transitWarehoureList,
    searchList: state => state.common.searchList,
    permission_routes(state) {
        if (getMenus()) {
            return JSON.parse(getMenus())
        }
        return state.permission.routes
    },
    errorLogs: state => state.errorLog.logs
}
export default getters