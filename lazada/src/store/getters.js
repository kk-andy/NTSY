import { getMenus } from '@/utils/auth'
const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    operationLogTitle: state => state.common.operationLogTitle,
    operationLogList: state => state.common.operationLogList,
    distributionTitle: state => state.common.distributionTitle,
    releaseTitle: state => state.common.releaseTitle,
    page: state => state.common.page,
    logPage: state => state.common.logPage,
    settingTargetTitle: state => state.common.settingTargetTitle,
    templateTitle: state => state.common.templateTitle,
    offShelfTitle: state => state.common.offShelfTitle,
    ListingTypeList: state => state.common.ListingTypeList,
    siteList: state => state.common.siteList,
    placeholder: state => state.common.placeholder,
    synchronousMattersList: state => state.common.synchronousMattersList,
    statusList: state => state.common.statusList,
    isList: state => state.common.isList,
    isTort :state => state.common.isTort,
    shopList: state => state.common.shopList,
    sellerList: state => state.common.sellerList,
    templateList: state => state.common.templateList,
    productLineList: state => state.common.productLineList,
    brandList: state => state.common.brandList,
    uploadUrl: state => state.common.uploadUrl,
    lazadaStatusList: state => state.common.lazadaStatusList,
    headers: state => state.common.headers,
    syncList: state => state.common.syncList,
    shopMethodsList: state => state.common.shopMethodsList,
    DevelperList: state => state.common.DevelperList,
    lazadaURL: state => state.common.lazadaURL,
    noPermissonShops: state => state.common.noPermissonShops,
    accountList(state) {
        let list = []
        state.common.accountList.forEach(item => {
            list.push({
                label: item,
                value: item
            })
        })
        return list
    },
    platform(state) {
        let list = []
        state.listOfSelections.platform.forEach(item => {
            let obj  = {}
            for (let key in item) {
                obj.id = key
                obj.value = item[key]
            }
            list.push(obj)
        })
        return list
    },
    permission_routes(state) {
        if (getMenus()) {
            return JSON.parse(getMenus())
        }
        return state.permission.routes
    },
    errorLogs: state => state.errorLog.logs
}
export default getters