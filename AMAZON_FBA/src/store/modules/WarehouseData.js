
/* 添加仓库 */
import { addWarehouse, getWarehouseContent } from '@/api/WarehouseData'
import { message  } from '@/utils/common'
import router from '@/router'
const state = {
    tableData: [],
    total: 0,
    form: {
        whouseName: '',
        remark: '',
        contactName: '',
        province: '',
        city: '',
        address: '',
        streetAddress: '',
        postalCode: '',
        type: '',
        contactPhone: ''
    },
    checkDataList: []
}
const mutations = {
    change_CheckDataList(state, val) {
        state.checkDataList = val
    },
    GET_WAREHOUSE_CONTENT(state, data) {
        data.type = String(data.type)
        state.form = data
    },
    CLEAR_FORM(state) {
        Object.keys(state.form).forEach(key => state.form[key] = '')
    }
}
const actions = {
    async addWarehouse({}, data) {
        await addWarehouse(data).then(res => {
            if (res.code === 0) {
                router.push({
                    name: 'WarehouseManagement'
                })
            } else {
                message('error', res.msg)
            }
        })
    },
    async getWarehouseContent({ commit }, params) {
        await getWarehouseContent(params).then(res => {
            commit('GET_WAREHOUSE_CONTENT', res.data)
            console.log(res)
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}