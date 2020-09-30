import { Message, Loading } from 'element-ui'
let loadingInstance
import Vue from 'vue'
Vue.prototype.$bus = new Vue();
let timeout = null;
//全局实例
const bus = new Vue();
window.bus = bus;
export const selectSupplierFunc = (multipleSelection, message) => {
    message = message || ''
    if (multipleSelection.length < 1) {
        Message({
            message,
            type: 'warning'
        })
        return false
    }
    const checkList = []
    multipleSelection.forEach(item => {
        checkList.push(item.spu)
    })
    return checkList
}
export const debounce = (fn, wait) => {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
};
export const selectProductId = (multipleSelection) => {
    // message = message || ''
    if (multipleSelection.length < 1) {
        Message({
            message: '请选择需要同步的商品',
            type: 'warning'
        })
        return false
    }
    if (!multipleSelection.every(item => item.push_status === '刊登失败')) {
        let list = [] 
        multipleSelection.map(item => {
            if (item.push_status !== '刊登失败') {
                list.push(item.product_sku)
            }
        })
        Message({
            message: `<div style="word-break: break-all">${[...new Set(list)]} sku不为刊登失败状态，请重新选择</div>`,
            dangerouslyUseHTMLString: true,
            type: 'warning',
            duration: 5000
        })
        return
    }
    let checkList = []
    multipleSelection.forEach(item => {
        checkList.push(item.id)
    })
    return checkList
}
export const selectSyncList = multipleSelection => {
    if (multipleSelection.length < 1) {
        Message({
            message: '请选择需要重新同步的商品',
            type: 'warning',
        })
        return false
    }
    if (new Set(multipleSelection.map(item => item.push_status)).size > 1) {
        Message({
            message: '存在有不是同步失败状态的商品',
            type: 'warning'
        })
        return false
    }
    let checkList = []
    multipleSelection.forEach(item => {
        checkList.push(item.id)
    })
    return checkList
}
export const selectListingID = (multipleSelection) => {
    if (multipleSelection.length < 1) {
        Message({
            message: '请先选择Listing',
            type: 'warning'
        })
        return false
    }
    let checkList = []  
    checkList = multipleSelection.filter(item => item.sku_status !== 'deleted').map(item => item.item_id)
    if (!checkList.length) {
        message('warning', '当前没有符合条件的数据')
        return false
    }
    return checkList
}
export const clearObjValue = (obj) => {
    Object.keys(obj).forEach(key => obj[key] = '')
}
export const dateFormat = (dateArray) => {
        if (typeof dateArray !== 'array') {
            let time = new Date(dateArray)
            const sy = time.getFullYear()
            const sm = time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1
            const sd = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()
            return   `${sy}-${sm}-${sd}`
        }
         else {
            const startTime = new Date(dateArray[0])
            const endTime = new Date(dateArray[1])
            const sy = startTime.getFullYear()
            const sm = startTime.getMonth() + 1 < 10 ? `0${startTime.getMonth() + 1}` : startTime.getMonth() + 1
            const sd = startTime.getDate() < 10 ? `0${startTime.getDate()}` : startTime.getDate()
            const ey = endTime.getFullYear()
            const em = endTime.getMonth() + 1 < 10 ? `0${endTime.getMonth() + 1}` : endTime.getMonth() + 1
            const ed = endTime.getDate() < 10 ? `0${endTime.getDate()}` : endTime.getDate()
            return `${sy}-${sm}-${sd}-${ey}-${em}-${ed}`
         }
        
    }
    // 连接符
export const dateFormatT = (dateArray) => {
        if (!dateArray[0]) {
            return
        }
        const startTime = new Date(dateArray[0])
        const endTime = new Date(dateArray[1])
        const sy = startTime.getFullYear()
        const sm = startTime.getMonth() + 1 < 10 ? `0${startTime.getMonth() + 1}` : startTime.getMonth() + 1
        const sd = startTime.getDate() < 10 ? `0${startTime.getDate()}` : startTime.getDate()
        const sh = startTime.getHours() < 10 ? `0${startTime.getHours()}` : startTime.getHours()
        const smin = startTime.getMinutes() < 10 ? `0${startTime.getMinutes()}` : startTime.getMinutes()
        const sec = startTime.getSeconds() < 10 ? `0${startTime.getSeconds()}` : startTime.getSeconds()
        const ey = endTime.getFullYear()
        const em = endTime.getMonth() + 1 < 10 ? `0${endTime.getMonth() + 1}` : endTime.getMonth() + 1
        const ed = endTime.getDate() < 10 ? `0${endTime.getDate()}` : endTime.getDate()
        const eh = endTime.getHours() < 10 ? `0${endTime.getHours()}` : endTime.getHours()
        const emin = endTime.getMinutes() < 10 ? `0${endTime.getMinutes()}` : endTime.getMinutes()
        const eec = endTime.getSeconds() < 10 ? `0${endTime.getSeconds()}` : endTime.getSeconds()
        return {
            start: `${sy}-${sm}-${sd} ${sh}:${smin}:${sec}`,
            end: `${ey}-${em}-${ed} ${eh}:${emin}:${eec}`
        }
    }
    // 下载文件流
export const downlaod = (data, name) => {
    const dom = document.createElement('a') // 隐藏的a标签，href为输出流
    const blob = new Blob([data], { type: 'application/vnd.ms-excel' }) // 创建一个类文件对象：Blob对象表示一个不可变的、原始数据的类文件对象
    const url = window.URL.createObjectURL(blob) // 生成一个Blob对象
    dom.style.display = 'none'
    dom.href = url
    document.body.appendChild(dom)
    dom.setAttribute('download', name) // 指示浏览器下载url,而不是导航到它
    dom.click()
    document.body.removeChild(dom)
        // 手动释放创建的URL对象所占内存
    URL.revokeObjectURL(url)
}
export const getAdaptiveHeight = (domHeight, ref, setAside = 20) => {
    // this.styleHeight = window.innerHeight - this.$refs.refValue.offsetTop - 20;
    domHeight = window.innerHeight - ref.offsetTop - setAside;
    //window.innerHeight:浏览器的可用高度
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    // ref.offsetTop：组件距离浏览器的高度
    //setAside：根据需求空出的高度，自行调整

    return domHeight;
}
export const confirmMsg = (type, title, msg, success, cancel) => {
    bus.$confirm(msg, title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type
        })
        .then(() => {
            if (typeof success == 'function') {
                success();
            }
        })
        .catch(() => {
            if (typeof cancel == 'function') {
                cancel();
            }
        });
}
export const message = (type, message, duration = 3000) => {
    bus.$message({
        type,
        message,
        duration
    })
}
export const getDaysNum = (days, mounth, bool) => {
    // 获取中间值
    let middleDay = Math.floor(days / 2)
    let list = []
    if (bool) {
        for (let i = 1; i <= middleDay; i++) {
            list.push({
                time: `${mounth}.${i}`,
                date: `${mounth}.${i}`
            })
        }
    } else {
        for (let i = middleDay + 1; i <= days; i++) {
            list.push({
                time: `${mounth}.${i}`,
                date: `${mounth}.${i}`
            })
        }
    }
    return list
}
export const scrollTop = () =>  {
    if (window.document.querySelector('.el-table__body-wrapper')) {
        if (window.document.querySelector('.el-table__body-wrapper').scrollTop) {
            window.document.querySelector('.el-table__body-wrapper').scrollTop = 0;
        }
    }
    if (document.getElementsByClassName('router_view_box')[0]) {
        if (document.getElementsByClassName('router_view_box')[0].scrollTop) {
            document.getElementsByClassName('router_view_box')[0].scrollTop = 0 // 让滚动条回到顶部
        }
    }
}
export const loading  = () => {
    loadingInstance = Loading.service({ fullscreen: true, text: '拼命加载中', spinner: 'el-icon-loading', target: '.main-container' })
}
export const loadingClose = () => {
    loadingInstance.close()
}
export const lazadaRequiredWord = (data) => {
    let flag = true
    data.forEach(item => {
        if (item.is_mandatory) {
            if (!item.value) {
                flag = false
                return
            }
        }
    })
    return flag
}
/* 获取一年后的时间 */
export const getAfterOneYear = () => {
    let date = new Date()
    date.setFullYear(date.getFullYear() + 10)
    return date
}