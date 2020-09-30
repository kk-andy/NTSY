import {
    getTemplateData,
} from '@/api/templateData'
const state = {
    banner: '',
    templateTitle: "",
    carouselImages: [],
    description: '',
    tabBarData: [],
    imgLength: [],
    previewTemplate: ''
};
const mutations = {
    bannerEdit(state, val) {
        state.banner = val
    },
    templateTitleEdit(state, val) {
        state.templateTitle = val
    },
    carouselImagesEdit(state, val) {
        state.carouselImages = val
    },
    descriptionEdit(state, val) {
        state.description = val
    },
    tabBarDataEdit(state, val) {
        state.tabBarData = val
    },
    imgLengthEdit(state, val) {
        state.imgLength = val
    },
    previewTemplateEidt(state, val) {
        state.previewTemplate = val
    },

};
const actions = {
    getTemplateData({ commit }, query) {
        return new Promise((resolve, reject) => {
            getTemplateData(query).then(res => {

                commit('bannerEdit', res.data.banner)
                commit('templateTitleEdit', res.data.title)
                commit('carouselImagesEdit', res.data.carousel)
                commit('descriptionEdit', res.data.description)
                commit('tabBarDataEdit', res.data.tab)

                var arr = [];
                res.data.carousel.forEach((e, index) => {
                    if (index < 5) {
                        arr.push({ id: index + 1, value: e.value });
                    }
                });

                commit('imgLengthEdit', arr)

                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}