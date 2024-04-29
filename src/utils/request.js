// axiost 封装

import { Message } from "element-ui"
import axios from 'axios'
import router from "@/router/router"


// 创建axios对象，添加全局配置
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 8000
})

// 请求拦截器
service.interceptors.request.use((req) => {
    const header = req.headers
    // 添加token
    if (!header.Authorization) {
        header.Authorization = 'Bearer + xiaoRui'
    }
    return req
})

//  响应拦截(除了403和406token认证外，其他的返回，基于严谨在具体的接口判断状态码)
service.interceptors.response.use((res) => {
    const { code, data, message } = res.data;
    if (code === 403) {
        Message.error(message);
        setTimeout(() => {
            // todo 清除存储信息
            router.push('/login')
        }, 1500)
    } else if (code === 406) {
        Message.error(message);
        setTimeout(() => {
            // todo 清除存储信息
            router.push('/login')
        }, 1500)
    } else {
        return res
    }
})

/**
 * 请求核心函数
 * @param {Object} options 请求配置对象，包括方法(method)、数据(data)、参数(params)等
 * @returns 返回一个Promise对象，用于处理请求的结果
 */
function request(options) {
    // 设置默认请求方法为GET
    options.method = options.method || 'get'
    // 如果请求方法为GET，则将数据赋给参数
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data;
    }
    // 设置请求基础URL为环境变量中的VUE_APP_BASE_API
    service.defaults.baseURL = process.env.VUE_APP_BASE_API
    // 发起请求
    return service(options)
}

export default request;