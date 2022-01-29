import request from '@/utils/request'

const api_name = '/admin/acl/roles'

export default {

  getPageList(queryParam) {
    return request({
      url: `${api_name}`,
      method: 'get',
      params: queryParam
    })
  },

  getById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },

  save(role) {
    return request({
      url: `${api_name}`,
      method: 'post',
      data: role
    })
  },

  updateById(role) {
    return request({
      url: `${api_name}`,
      method: 'put',
      data: role
    })
  },

  getAssign(roleId) {
    return request({
      url: `${api_name}/toAssign/${roleId}`,
      method: 'get'
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },
  removeRows(idList) {
    return request({
      url: `${api_name}/batchRemove`,
      method: 'delete',
      data: idList
    })
  },

  getAssign(roleId) {
    return request({
      url: `${api_name}/getAssign/${roleId}`,
      method: 'get'
    })
  },

  doAssign(roleId, permissionId) {
    return request({
      url: `${api_name}/doAssign`,
      method: 'post',
      params: { roleId, permissionId }
    })
  }

}
