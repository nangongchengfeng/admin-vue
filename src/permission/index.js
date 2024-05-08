/**
* vue使用权限配置
*
*/
/**
 * 导入权限控制模块
 */
import authority from './authority'
import Vue from "vue";

/**
 * 安装指令函数
 * @param {Object} Vue - Vue构造函数，用于注册自定义指令
 */
const install = function (Vue) {
    Vue.directive('authority', authority);
};

/**
 * 在全局Vue实例存在时，注册指令并挂载到Vue实例上
 */
if (window.Vue) {
    window.authority = authority; // 将权限控制模块暴露到全局窗口对象上
    Vue.use(install); // 使用install函数注册插件
}

// 为authority对象挂载install方法，使其支持Vue插件的安装方式
authority.install = install;

/**
 * 导出权限控制模块，支持ES6模块导入
 * @default
 */
export default authority;