import request from '@/utils/request'

const api_name = '/eduservice/front-course'

export default {
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  // 获取课程二级分类
  getNestedTreeList2() {
    return request({
      url: `/eduservice/edu-subject`,
      method: 'get'
    })
  },

  getById(courseId,token) {
    return request({
      url: `${api_name}/${courseId}/${token}`,
      method: 'get'
    })
  }
}
