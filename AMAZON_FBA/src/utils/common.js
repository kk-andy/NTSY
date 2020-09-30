import { Message, Loading } from 'element-ui'
let loadingInstance
import Vue from 'vue'
Vue.prototype.$bus = new Vue();
let timeout = null;
//全局实例
const bus = new Vue();
window.bus = bus;
export const debounce = (fn, wait) => {
  if (timeout !== null) clearTimeout(timeout);
  timeout = setTimeout(fn, wait);
};
export const clearObjValue = (obj) => {
  Object.keys(obj).forEach(key => obj[key] = '')
}
export const dateFormat = (dateArray) => {
  if (typeof dateArray !== 'array') {
    let time = new Date(dateArray)
    const sy = time.getFullYear()
    const sm = time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1
    const sd = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()
    const sh = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()
    const smin = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
    const sec = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()
    return `${sy}-${sm}-${sd} ${sh}:${smin}:${sec}`
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
    start: `${sy}-${sm}-${sd}`,
    end: `${ey}-${em}-${ed}`
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
export const scrollTop = () => {
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
export const loading = () => {
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
// export function toDecimal(arg, places = 2) {
//   let f = parseFloat(x);
//   if (isNaN(f)) {
//     return false;
//   }
//   let f = parseInt(x * 100) / 100; // round() 方法可把一个数字舍入为最接近的整数
//   let s = f.toString();
//   let rs = s.indexOf('.');
//   if (rs < 0) {
//     rs = s.length;
//     s += '.';
//   }
//   while (s.length <= rs + 2) {
//     s += '0';
//   }
//   return s;

// }