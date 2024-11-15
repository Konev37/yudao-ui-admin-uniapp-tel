import request from '@/utils/request'

export function getSimpleDeptList() {
    return request({
        url: '/system/dept/simple-list',
        method: 'GET'
    })
}