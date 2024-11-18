import request from '@/utils/request'

// 查询基础设施分页
export function getInfrastructurePage(params) {
    return request({
        url: '/infrastructure/infrastr/page',
        method: 'GET',
        params: params
    })
}