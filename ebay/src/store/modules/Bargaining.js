    import { getData, acceptListing, declineListing, counterInfo, saveCounterInfo, addNote } from '@/api/Bargaining'
import { param } from '@/utils'
    const state = {
        typeList: [
            {
                label: '未处理',
                value: 0
            },
            {
                label: '已还价',
                value: 1
            },
            {
                label: '已拒绝',
                value: 2
            },
            {
                label: '已接受',
                value: 3
            }
        ],
        modal_note: false,
        modalNote: '',
        total: 0,
        tableData: [],
        info: {},
        modal_counteroffer:false,
    }
  
    const mutations = {
        GET_DATA(state, data) {
            state.total = data.total
            data.data.forEach(item => {
                // item.detail_info.reverse()
            })
            state.tableData = data.data
        },
        GET_INFO(state, data) {
            state.modal_counteroffer = true
            state.info = data
        },
        CLOSE_INFO_MODA(state) {
            Object.keys(state.info).forEach(key => state.info[key] = '')
            state.modal_counteroffer = false
        },
        CLOSE_NOTE_MODAL(state) {
            state.modal_note = false
            state.modalNote = ''
        }
    }
  
    const actions = {
        async getData({ commit }, params) {
            await getData(params).then(res => {
                commit('GET_DATA', res.data)
            })
        },
        async acceptListing({ dispatch }, { data, params }) {
            await acceptListing(data).then(res => {
                if (res.code === 0) {
                    dispatch('getData', params)
                }
            })
        },
        async declineListing({ dispatch }, { data, params }) {
            await declineListing(data).then(res => {
                if (res.code === 0) {
                    dispatch('getData', params)
                }
            })
        },
        async counterInfo({ commit }, { params }) {
            await counterInfo(params).then(res => {
                if (res.code === 0) {
                    commit('GET_INFO', res.data)
                }
            })
        },
        async saveCounterInfo({ commit, dispatch }, { data, params }) {
            await saveCounterInfo(data).then(res => {
                if (res.code === 0) {
                    dispatch('getData', params)
                    commit('CLOSE_INFO_MODA')
                }
            })
        },
        async addNote({ dispatch, commit  }, { data, params }) {
            await addNote(data).then(res => {
                if (res.code === 0) {
                    commit('CLOSE_NOTE_MODAL')
                    dispatch('getData', params)         
                }
            })
        },
    }
    
    export default {
        namespaced: true,
        state,
        mutations,
        actions
    }
  