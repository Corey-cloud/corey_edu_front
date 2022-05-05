import request from '@/utils/request'
const api_name = '/ucenter/admin/member'

export default {

  // 分页获取成员列表
  getPageList(queryParam) {
    return request({
      url: `${api_name}`,
      method: 'get',
      params: queryParam
    })
  },

  // 根据id获取
  getById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },

  // 新增
  save(member) {
    return request({
      url: `${api_name}`,
      method: 'post',
      data: member
    })
  },

  // 根据ID逻辑删除
  removeById(id) {
    return request({
      url: `${api_name}`,
      method: 'delete',
      params: { id }
    })
  },

  // 修改
  updateById(member) {
    return request({
      url: `${api_name}`,
      method: 'put',
      data: member
    })
  }
}
