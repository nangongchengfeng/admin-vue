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

    // 菜单
    queryMenuList(params) {
        return request({
            url: "/menu/list",
            method: 'get',
            data: params
        })
    },
    querySysMenuVoList() {
        return request({
            url: "/menu/vo/list",
            method: 'get'
        })
    },
    addMenu(data) {
        return request({
            url: '/menu/add',
            method: 'post',
            data: data
        })
    },
    menuInfo(id) {
        const data = {
            id
        }
        return request({
            url: '/menu/info',
            method: 'get',
            data: data
        })
    },
    menuUpdate(data) {
        return request({
            url: '/menu/update',
            method: 'put',
            data: data
        })
    },
    menuDelete(id) {
        const data = {
            id
        }
        return request({
            url: '/menu/delete',
            method: 'delete',
            data: data
        })
    },
    // role角色
    queryRoleList(params) {
        return request({
            url: "/role/list",
            method: 'get',
            data: params
        })
    },
    querySysRoleVoList() {
        return request({
            url: "/role/vo/list",
            method: 'get'
        })
    },
    addRole(data) {
        return request({
            url: '/role/add',
            method: 'post',
            data: data
        })
    },
    roleInfo(id) {
        const data = {
            id
        }
        return request({
            url: '/role/info',
            method: 'get',
            data: data
        })
    },
    roleUpdate(data) {
        return request({
            url: '/role/update',
            method: 'put',
            data: data
        })
    },
    deleteRole(id) {
        const data = {
            id
        }
        return request({
            url: '/role/delete',
            method: 'delete',
            data: data
        })
    },
    updateRoleStatus(id, status) {
        const data = {
            id,
            status
        }
        return request({
            url: "/role/updateStatus",
            method: 'put',
            data: data
        })
    },
    QueryRoleMenuIdList(id) {
        const data = {
            id
        }
        return request({
            url: "/role/vo/idList",
            method: 'get',
            data: data
        })
    },
    AssignPermissions(id, menuIds) {
        const data = {
            id,
            menuIds
        }
        return request({
            url: "/role/assignPermissions",
            method: 'put',
            data: data
        })
    },

}