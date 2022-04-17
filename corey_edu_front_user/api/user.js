import request from '@/utils/request'

const api_name = '/ucenter/member'

export default {
  updatePasswd(user) {
    return request({
      url: `${api_name}/updatePassword`,
      method: 'put',
      data: user
    })
  },
  getById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },
  updateById(user) {
    return request({
      url: `${api_name}`,
      method: 'put',
      data: user
    })
  }
}
