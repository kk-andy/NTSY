import axios from 'axios'
import {
    Message,
    Loading
} from 'element-ui'
import store from '@/store'
import {
    getSesstionToken
} from '@/utils/auth'
import router from '@/router'
let loadingInstance
// create an axios instance
const service = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_BASE_API,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 600000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // debugger
        // do something before request is sent
        if (getSesstionToken()) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = getSesstionToken()
        }
        // let arr = document.getElementsByClassName('el-loading-mask')
        // for (let item of arr) {
        //     item.style.display = 'block'
        // }
        return config
    },
    // loadingInstance = Loading.service({ fullscreen: true, text: '拼命加载中', spinner: 'el-icon-loading', target: '.main-container' }),
    error => {
        // do something with request error
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        // debugger
        const res = response.data
        // let arr = document.getElementsByClassName('el-loading-mask')
        // for (let item of arr) {
        //     item.style.display = 'none'
        // }
        // console.log(arr)
        if (res.code !== 0) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
        }
        if (res.code === 777) {
            Message({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            router.replace({
                path: '/401'
            })
            window.location.href = `${process.env.VUE_APP_LOGIN_URL}/#/login`
            return Promise.reject(new Error(res.message || 'Error'))
        }
        // if (res.code === 5000) {
        //     // Message({
        //     //     message: res.message || 'Error',
        //     //     type: 'error',
        //     //     duration: 5 * 1000
        //     // })
        //     return res
        // }
        // if (res.code >= 1000 && res.code <= 6000 && res.code !== 5000) {
        //     Message({
        //         message: res.message || 'Error',
        //         type: 'error',
        //         duration: 5 * 1000
        //     })
        //     if (res.code === 6000) {
        //         Message({
        //             message: res.message || 'Error',
        //             type: 'error',
        //             duration: 5 * 1000
        //         })
        //         // window.location.href = `${process.env.VUE_APP_LOGIN_URL}/#/login`
        //         router.replace({
        //             path: '/404'
        //         })
        //     }
        //     return Promise.reject(new Error(res.message || 'Error'))
        // }
        // if (res.code > 6000) { // token失效
        //     Message({
        //         message: res.message || 'Error',
        //         type: 'error',
        //         duration: 5 * 1000
        //     })
        //     // router.replace({
        //     //     path: '/401'
        //     // })
        //     window.location.href = `${process.env.VUE_APP_LOGIN_URL}/#/login`
        // }
        // if (res.code === 304) { 
        //     Message({
        //         message: res.message || 'Error',
        //         type: 'error',
        //         duration: 5 * 1000
        //     })
        //     window.location.href = `${process.env.VUE_APP_LOGIN_URL}/#/login`
        // }
        // loadingInstance.close()
        return res
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        // loadingInstance.close()
        return Promise.reject(error)
    }
)
export default service
