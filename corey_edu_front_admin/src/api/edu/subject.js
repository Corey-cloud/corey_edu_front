import request from '@/utils/request'

const api_name = '/edu/admin/subjects'

export default {
  // 获取课程分类列表
  getNestedTreeList() {
    return request({
      url: `${api_name}`,
      method: 'get'
    })
  }
}
