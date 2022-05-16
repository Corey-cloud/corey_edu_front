import request from '@/utils/request'

const api_name = '/admin/acl'

export default {

  // 获取公钥
  getPublicKey() {
    return request({
      url: `/rsa/acl/getPublicKey`,
      method: 'get'
    })
  },

  // 分页获取
  getPageList(queryParam) {
    return request({
      url: `${api_name}/users`,
      method: 'get',
      params: queryParam
    })
  },

  // 根据id获取
  getById(id) {
    return request({
      url: `${api_name}/users/${id}`,
      method: 'get'
    })
  },

  // 保存
  save(user) {
    return request({
      url: `${api_name}/users`,
      method: 'post',
      data: user
    })
  },

  // 修改
  updateById(user) {
    return request({
      url: `${api_name}/users`,
      method: 'put',
      data: user
    })
  },

  // 删除
  removeById(id) {
    return request({
      url: `${api_name}/users/${id}`,
      method: 'delete'
    })
  },

  // 根据用户id获取所属角色列表
  getAssign(userId) {
    return request({
      url: `${api_name}/users/toAssign/${userId}`,
      method: 'get'
    })
  },

  // 保存用户对应的角色关系
  saveAssign(userId, roleId) {
    return request({
      url: `${api_name}/users/doAssign`,
      method: 'post',
      params: { userId, roleId }
    })
  },

  // 根据id列表批量删除用户信息
  removeRows(idList) {
    return request({
      url: `${api_name}/users/batchRemove`,
      method: 'delete',
      data: idList
    })
  }
}
