/**
 * 路由的封装
 * 
*/

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/Welcome.vue'


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
                    component: Welcome
                }
            ]
        }
    ]
})



export default router