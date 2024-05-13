/**
 * 路由的封装
 * 
*/

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import storage from '@/utils/storage'
import Admin from "@/views/base/Admin"
import Role from "@/views/base/Role"
import Welcome from "@/views/Welcome"
import Menu from "@/views/base/Menu"
import Dept from "@/views/base/Dept"
import Post from "@/views/base/Post"
import Personal from "@/views/Personal"
import Operator from "@/views/monitor/Operator"
import LoginLog from "@/views/monitor/LoginLog"
import HostInfo from "@/views/monitor/HostInfo"

/**
 * 注册一个全局的插件到 Vue。
 * 
 * @param {Object} Router - Vue Router插件的对象实例。通过这个方法，Vue实例就可以使用Router插件提供的功能。
 * @returns {Void} 无返回值。
 */

Vue.use(Router)

// 各个路由集合
const router = new Router({
    mode: 'history', // 使用历史模式
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                {
                    path: '/welcome',
                    component: Welcome,
                    meta: { tTitle: '首页' }
                },
                {
                    path: '/personal',
                    component: Personal,
                    meta: { sTitle: '个人中心', tTitle: '个人信息' }
                },
                {
                    path: '/base/Admin',
                    component: Admin,
                    meta: { sTitle: '基础管理', tTitle: '用户信息' }
                },
                {
                    path: '/base/Role',
                    component: Role,
                    meta: { sTitle: '基础管理', tTitle: '角色信息' }
                },
                {
                    path: '/base/Menu',
                    component: Menu,
                    meta: { sTitle: '基础管理', tTitle: '菜单信息' }
                },
                {
                    path: '/base/Dept',
                    component: Dept,
                    meta: { sTitle: '基础管理', tTitle: '部门信息' }
                },
                {
                    path: '/base/Post',
                    component: Post,
                    meta: { sTitle: '基础管理', tTitle: '岗位信息' }
                },
                {
                    path: '/monitor/Operator',
                    component: Operator,
                    meta: { sTitle: '监控管理', tTitle: '操作日志' }
                },
                {
                    path: '/monitor/LoginLog',
                    component: LoginLog,
                    meta: { sTitle: '监控管理', tTitle: '登录日志' }
                },
                {
                    path: '/monitor/HostInof',
                    component: HostInfo,
                    meta: { sTitle: '监控管理', tTitle: '主机信息' }
                }
            ]
        }
    ]
})

// 挂载路由导航
/**
 * 在路由跳转前的全局守卫中添加逻辑。
 * 主要用于检查用户是否登录，未登录则重定向到登录页。
 * 
 * @param {Object} to - 即将要访问的路由对象
 * @param {Object} from - 当前导航的路由对象
 * @param {Function} next - 下一个钩子函数，用于控制路由跳转
 */
router.beforeEach((to, from, next) => {
    // 如果目标路径是登录页，则直接放行
    if (to.path === '/login') {
        return next();
    }
    // 从存储中获取token
    const tokenStr = storage.getItem("token")
    // 如果没有token，重定向到登录页
    if (!tokenStr) {
        return next('/login')
    }
    // 有token，正常跳转
    next()
})


export default router