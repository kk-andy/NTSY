import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import _g from '@/global';
// import { getToken } from '@/utils/auth'

let loading;

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: "拼命加载中...",
        background: 'rgba(255,255,255,0.7)'
    });
}

function endLoading() {
    loading.close();
}


// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_AUTHORITY_API_DOMAIN, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 500000 // request timeout
})

// request interceptor
// 请求拦截
service.interceptors.request.use(config => {
    // 加载动画
    startLoading();
    if (store.getters.token) {
        config.headers.Authorization = sessionStorage.getItem('token')
    }

    return config
},
    error => {
        // do something with request error
        // console.log(error) // for debug
        // return Promise.reject(error)
    }
)

// response interceptor
// 响应拦截
service.interceptors.response.use(response => {
    const res = response.data
    if (res.code === 777) {
        sessionStorage.clear();
        window.location.href = _g.getLastDomain()
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
        Message({
            message: res.msg || res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
        })
        if (res.code === 5000) {
            Message({
                message: `${res.message}${res.data.words}`,
                type: 'error',
                duration: 5 * 1000
            })
        }
        // 结束加载动画
        endLoading();
        return Promise.reject(new Error(res.message || 'Error'))
    } else {
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

export default service