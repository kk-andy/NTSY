
// 导入Vue, 需要使用Vue.component()方法注册组件
import Vue from 'vue'

// let f = r =&gt; {
//   return r.keys().map(key =&gt; r(key));
// }
//
// console.log(f(require.context('./modal', true, /\.vue/)));

// 将 ./modal 下的所有组件全部读取出来
//
//
// requireComponents: ƒ webpackContext(req) {
//     return __webpack_require__(webpackContextResolve(req));
// }

/**
 * @var requireComponents -- requireComponents保存每个文件的相对路径的集合,可通过keys()返回
 * @function requireComponents -- 也是个方法,传入keys()枚举出来的路径可返回组件实例
 */

const requireComponents = require.context('./', true, /\.vue/);
// 打印结果
// requireComponents: ƒ webpackContext(req) {
//     return __webpack_require__(webpackContextResolve(req));
// }
//

// 遍历出每个组件的路径
requireComponents.keys().forEach(fileName => {
    // 组件实例
    const reqCom = requireComponents(fileName)
    // 截取路径作为组件名
    const reqComName = fileName.split('/')[1]
    // 组件挂载
    Vue.component(reqComName, reqCom.default || reqCom)
  })