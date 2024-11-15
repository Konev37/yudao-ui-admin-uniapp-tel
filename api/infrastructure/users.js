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