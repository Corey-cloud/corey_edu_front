import request from '@/utils/request'

const api_name = '/edu/courses'

export default {
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  // 获取课程二级分类
  getAllSubject() {
    return request({
      url: `/edu/admin/subjects`,
      method: 'get'
    })
  },

  getById(courseId) {
    return request({
      url: `${api_name}/${courseId}`,
      method: 'get'
    })
  }
}
