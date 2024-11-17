import request from '@/utils/request'

// 获取用户精简信息列表
export function getSimpleUserList() {
    return request({
        url: '/system/user/simple-list',
        method: 'GET'
    })
}

// 查询用户管理列表
export function getUserPage(params) {
    return request({
        url: '/system/user/page',
        method: 'GET',
        params: params
    })
}

// 查询用户详情
export function getUser(id) {
    return request({
        url: '/system/user/get',
        method: 'GET',
        params: { id }
    })
}

// 修改用户信息
export function updateUser(data) {
    return request({
        url: '/system/user/update',
        method: 'PUT',
        data: data
    })
}

// 新增用户
export function createUser(data) {
    return request({
        url: '/system/user/create',
        method: 'POST',
        data: data
    })
}

// 删除用户
export function deleteUser(id) {
    return request({
        url: '/system/user/delete',
        method: 'DELETE',
        params: { id }
    })
}