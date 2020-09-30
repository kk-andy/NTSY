import {
    Message,
    Loading
} from 'element-ui'
let loadingInstance
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
export const selectSupplierSku = (multipleSelection, message) => {
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
        checkList.push(item.sku)
    })
    return checkList
}
export const valueData = (data) => {
    return data.map(item => {
        return {
            id: item,
            name: item
        }
    })
}
export const clearFormValue = (obj) => {
    Object.keys(obj).forEach(item => {
        switch (obj[item].formType) {
            case 'a-select':
                obj[item].value = (obj[item].multiple ? [] : undefined);
                break;
            default:
                obj[item].value = undefined
                break;
        }
    })
}

export const loading = () => {
    loadingInstance = Loading.service({
        fullscreen: true,
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        target: '.main-container'
    })
}
export const loadingClose = () => {
    loadingInstance.close()
}
export const selectSupplierFuncId = (multipleSelection, message) => {
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
        checkList.push(item.id)
    })
    return checkList
}
export const clearObjValue = (obj) => {
    Object.keys(obj).forEach(key => obj[key] = '')
}
export const GetFormValue = (obj) => {
    let data = {}
    Object.keys(obj).forEach(item => {
        data[item] = obj[item].value
    })
    return data
}
export const setFormValue = (obj, from) => {
    Object.keys(from).forEach(item => {
        from[item].value = obj[item]
    })
}

export const dateFormat = (dateArray) => {
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
export const dateFormatArr = (dateArray) => {
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
    // return `${sy}-${sm}-${sd}~${ey}-${em}-${ed}`
    return [`${sy}-${sm}-${sd}`, `${ey}-${em}-${ed}`]

}
// 下载文件流
export const downlaod = (data, name) => {
    const dom = document.createElement('a') // 隐藏的a标签，href为输出流
    const blob = new Blob([data], {
        type: 'application/vnd.ms-excel'
    }) // 创建一个类文件对象：Blob对象表示一个不可变的、原始数据的类文件对象
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
