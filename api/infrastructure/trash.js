import request from '@/utils/request'

// 查询垃圾桶分页
export function getTrashPage(params) {
    return request({
        url: '/infrastructure/trash/page',
        method: 'GET',
        params: params
    })
}

// 新增垃圾桶
export function createTrash(data) {
    return request({
        url: '/infrastructure/trash/create',
        method: 'POST',
        data: data
    })
}

// 修改垃圾桶
export function updateTrash(data) {
    return request({
        url: '/infrastructure/trash/update',
        method: 'PUT',
        data: data
    })
}

// 删除垃圾桶
export function deleteTrash(id) {
    return request({
        url: '/infrastructure/trash/delete',
        method: 'DELETE',
        params: { id }
    })
}