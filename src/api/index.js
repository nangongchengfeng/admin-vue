// 后端api接口 统一管理

import request from "./../utils/request";

export default {
    // 验证码接口
    captcha() {
        return request({
            url: '/captcha',
            method: 'get'
        })
    }
}