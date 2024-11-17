import request from '@/utils/request'

export function getSimpleUserList() {
    return request({
        url: '/system/user/simple-list',
        method: 'GET'
    })
}

export function getUserPage() {
    return request({
        url: '/system/user/page',
        method: 'GET'
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