import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import router from '@/router';
import store from '@/store'
import _g from '@/global';
import { startLoading, endLoading } from '@/utils/common'
// import {  }
// import { getToken } from '@/utils/auth'






// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_AUTH_API_DOMAIN, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 500000 // request timeout
})

// request interceptor
// 请求拦截
service.interceptors.request.use(config => {
        // 加载动画
        startLoading();
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        config.headers.Authorization = sessionStorage.getItem('token')
        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
            // return Promise.reject(error)
    }
)

// response interceptor
// 响应拦截
service.interceptors.response.use(response => {
            const res = response.data

            // if the custom code is not 20000, it is judged as an error.
            if (res.code !== 0) {
                // console.log(response)
                if (res.code === 777) {
                    sessionStorage.clear();
                    Message({
                        message: res.msg,
                        type: 'error',
                        duration: 1000
                    })
                    setTimeout(() => {
                        window.location.href = _g.getLastDomain()
                        return
                    }, 1000)
                }
                // if (res.code === 5000) {
                //     Message({
                //         message: `${res.message}${res.data.words}`,
                //         type: 'error',
                //         duration: 1000
                //     })
                //     // return
                // }
                // 结束加载动画
                endLoading();
                if (res.msg == '用户没有可用的权限') {
                    router.push('/401')
                }
                if (response.status === 200 && !res.code) {
                    endLoading()
                    return res
                }
                if (res.code === 5000) {
                    Message({
                        message: `${res.message}${res.data.words}`,
                        type: 'error',
                        duration: 5000
                    })
                } else {
                    Message({
                        message: res.msg || res.message || 'Error',
                        type: 'error',
                        duration: 5 * 1000
                    })
                }         
                return Promise.reject(new Error(res.message || 'Error'))
            } else {
                // if the custom code is not 20000, it is judged as an error.
                endLoading();
                return res
            }
        },
        error => {
            console.log('err' + error) // for debug
            Message({
                message: error.message,
                type: 'error',
                duration: 5 * 1000
            })
            endLoading();
            return Promise.reject(error)
        }
    )
    //定义请求前缀 
export default service

// $response -> header('Access-Control-Allow-Headers', 'Origin, Content-Type, Cookie, Accept, multipart/form-data, application/json, text/html, text/javascript, Authorization');
// $response -> header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');