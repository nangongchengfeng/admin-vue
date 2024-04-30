// 后端api接口 统一管理

import request from "./../utils/request";

export default {
    // 验证码接口
    captcha() {
        return request({
            url: '/captcha',
            method: 'get'
        })
    },
    // 登录接口
    login(params) {
        return request({
            url: '/login',
            method: 'post',
            data: params
        })
    },
    // post岗位
    queryPostList(params) {
        return request({
            url: "/post/list",
            method: 'get',
            data: params
        })
    },
    batchDeleteSysPost(ids) {
        const data = {
            ids
        }
        return request({
            url: '/post/batch/delete',
            method: 'delete',
            data: data
        })
    },
    deleteSysPost(id) {
        const data = {
            id
        }
        return request({
            url: '/post/delete',
            method: 'delete',
            data: data
        })
    },
    querySysPostVoList() {
        return request({
            url: '/post/vo/list',
            method: 'get'
        })
    },
    addPost(data) {
        return request({
            url: '/post/add',
            method: 'post',
            data: data
        })
    },
    postInfo(id) {
        const data = {
            id
        }
        return request({
            url: '/post/info',
            method: 'get',
            data: data
        })
    },
    updatePost(data) {
        return request({
            url: '/post/update',
            method: 'put',
            data: data
        })
    },
    updatePostStatus(id, postStatus) {
        const data = {
            id,
            postStatus
        }
        return request({
            url: "/post/updateStatus",
            method: 'put',
            data: data
        })
    },


    // dept部门
    queryDeptList(params) {
        return request({
            url: "/dept/list",
            method: 'get',
            data: params
        })
    },
    querySysDeptVoList() {
        return request({
            url: '/dept/vo/list',
            method: 'get'
        })
    },
    addDept(data) {
        return request({
            url: '/dept/add',
            method: 'post',
            data: data
        })
    },
    deleteDept(id) {
        const data = {
            id
        }
        return request({
            url: '/dept/delete',
            method: 'delete',
            data: data
        })
    },
    deptInfo(id) {
        const data = {
            id
        }
        return request({
            url: '/dept/info',
            method: 'get',
            data: data
        })
    },
    deptUpdate(data) {
        return request({
            url: '/dept/update',
            method: 'put',
            data: data
        })
    },


}