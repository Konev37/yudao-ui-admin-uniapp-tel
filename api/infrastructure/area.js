import request from '@/utils/request'

// 查询区域（精简)列表
export function getSimpleDeptList() {
    return request({
        url: '/system/dept/simple-list',
        method: 'GET'
    })
}

// 查询区域列表
export function getDeptPage(params) {
    return request({
        url: '/system/dept/list',
        method: 'GET',
        params: params
    })
}

// 新增部门
export function createDept(data) {
    return request({
        url: '/system/dept/create',
        method: 'POST',
        data: data
    })
}

// 修改部门
export function updateDept(data) {
    return request({
        url: '/system/dept/update',
        method: 'PUT',
        data: data
    })
}

// 删除部门
export function deleteDept(id) {
    return request({
        url: '/system/dept/delete',
        method: 'DELETE',
        params: { id }
    })
}