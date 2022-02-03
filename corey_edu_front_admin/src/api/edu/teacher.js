import request from '@/utils/request'
const api_name = 'edu/admin/teachers'

export default {

  // 分页获取列表
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
  save(teacher) {
    return request({
      url: `${api_name}`,
      method: 'post',
      data: teacher
    })
  },

  // 根据ID逻辑删除
  removeById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },

  // 修改
  updateById(teacher) {
    return request({
      url: `${api_name}`,
      method: 'put',
      data: teacher
    })
  },

  // 获取讲师列表，用于课程列表模糊查询讲师数据下拉框回显
  getList() {
    return request({
      url: `${api_name}/all`,
      method: 'get',
    })
  }
}
