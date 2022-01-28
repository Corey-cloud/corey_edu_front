import request from '@/utils/request'

const api_name = '/admin/acl'

export default {

  // 获取公钥
  getPublicKey() {
    return request({
      url: `${api_name}/publicKey`,
      method: 'get'
    })
  },

  // 分页获取
  getPageList(queryParam) {
    return request({
      url: `${api_name}/users`,
      method: 'get',
      params: queryParam // url查询字符串或表单键值对
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

  getAssign(userId) {
    return request({
      url: `${api_name}/toAssign/${userId}`,
      method: 'get'
    })
  },

  saveAssign(userId, roleId) {
    return request({
      url: `${api_name}/doAssign`,
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
