let timeout = null;
let loading;
import { Loading } from 'element-ui'
export const dateFormat = (date) => {

    const time = new Date(date)
    const y = time.getFullYear()
    const m = time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1
    const d = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()
    let h = time.getHours() >= 10 ? time.getHours() : `0${time.getHours()}`
    let min = time.getMinutes() >= 10 ? time.getMinutes() : `0${time.getMinutes()}`
    let s = time.getSeconds() >= 10 ? time.getSeconds() : `0${time.getSeconds()}`
    return `${y}-${m}-${d} ${h}:${min}:${s}`
}
export const clearObjValue = (obj) => {
    Object.keys(obj).forEach(key => obj[key] = '')
}
export const textFormat = (str) => {
    str = str.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ')
    return str
}
export const debounce = (fn, wait) => {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
};
export const dateFormatArray = (dateArray) => {
        if (!dateArray[0]) {
            return
        }
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
    const ey = endTime.getFullYear()
    const em = endTime.getMonth() + 1 < 10 ? `0${endTime.getMonth() + 1}` : endTime.getMonth() + 1
    const ed = endTime.getDate() < 10 ? `0${endTime.getDate()}` : endTime.getDate()
    return `${sy}-${sm}-${sd}~${ey}-${em}-${ed}`
}
export const requiredWord = (data) => {
    let flag = true
    data.forEach(item => {
        if (item.usage_constraint === 'Required') {
            if (!item.value) {
                flag = false
                return
            }
        }
    })
    return flag
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
export const gj_quantityValidator = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入值"));
    } else {
        if (isNaN(value) || value.indexOf('.') === 0) {
            return callback(new Error("请输入正确的数字"));
        } else {
            if (value.indexOf('.') === -1) {
                if (value > 99999 || value === 0) {
                    return callback(new Error("最大不能超过100000且大于0"));
                } else {
                    callback()
                }
            } else {
                let index = value.lastIndexOf('.') // 获取最后一个点的位置
                if ((value.length - index - 1) > 2 || value > 99999.99 || value === 0) {
                    return callback(new Error("最多只能是两位小数且小于100000"));
                } else {
                    callback()
                }
            }
        }
    }
};
export const _quantityValidator = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入值"));
    }
    if (Number.isInteger(value) && value > 0) {
        callback()
    } else {
        return callback(new Error("只能为长度为5位数以内的正整数"));
    }
};
export const download = (data, name) => {
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
export const startLoading = (text = '正在加载中') => {
    loading = Loading.service({
        lock: true,
        text,
        background: 'rgba(255,255,255,0.7)'
    });
}

export const endLoading = () => {
    loading.close();
}
export const firstToUpper = str => {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
} 
export const getTokenAndID = () => {
    return `token=${sessionStorage.getItem('token')}&id=${ sessionStorage.getItem('subId')}`
}