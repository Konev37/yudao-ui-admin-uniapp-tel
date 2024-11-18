import request from '@/utils/request'

// 查询消防栓分页
export function getFirePage(params) {
    return request({
        url: '/infrastructure/fire/page',
        method: 'GET',
        params: params
    })
}

// 新增消防栓
export function createFire(data) {
    return request({
        url: '/infrastructure/fire/create',
        method: 'POST',
        data: data
    })
}

// 修改消防栓
export function updateFire(data) {
    return request({
        url: '/infrastructure/fire/update',
        method: 'PUT',
        data: data
    })
}

// 删除消防栓
export function deleteFire(id) {
    return request({
        url: '/infrastructure/fire/delete?id=' + id,
        method: 'DELETE'
    })
}