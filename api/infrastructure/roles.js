import request from '@/utils/request'

// 查询角色列表
export function getRolePage(params) {
    return request({
        url: '/system/role/page',
        method: 'GET',
        params: params
    })
}