import request from '@/utils/request'

const api_name = '/admin/acl'

export default {

  // 获取全部菜单列表（递归）
  getNestedTreeList() {
    return request({
      url: `${api_name}/permissions`,
      method: 'get'
    })
  },

  // 添加菜单
  saveLevelOne(menu) {
    return request({
      url: `${api_name}/permissions`,
      method: 'post',
      data: menu
    })
  },

  // 修改
  update(menu) {
    return request({
      url: `${api_name}/permissions`,
      method: 'put',
      data: menu
    })
  },

  // 删除
  removeById(id) {
    return request({
      url: `${api_name}/permissions/${id}`,
      method: 'delete'
    })
  }
}
