import request from '@/utils/request'

// 查询基础设施分页
export function getInfrastructurePage(params) {
    return request({
        url: '/infrastructure/infrastr/page',
        method: 'GET',
        params: params
    })
}

// 新增基础设施
export function createInfrastructure(data) {
    return request({
        url: '/infrastructure/infrastr/create',
        method: 'POST',
        data: data
    })
}

// 修改基础设施
export function updateInfrastructure(data) {
    return request({
        url: '/infrastructure/infrastr/update',
        method: 'PUT',
        data: data
    })
}

// 删除基础设施
export function deleteInfrastructure(id) {
    return request({
        url: '/infrastructure/infrastr/delete?id=' + id,
        method: 'DELETE'
    })
}