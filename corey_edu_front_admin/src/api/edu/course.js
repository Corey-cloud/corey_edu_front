import request from '@/utils/request'

const api_name = '/edu/admin/courses'

export default {

  // 获取课程列表
  getPageList(queryParam) {
    return request({
      url: `${api_name}`,
      method: 'get',
      params: queryParam
    })
  },

  // 添加课程信息
  saveCourseInfo(courseInfo) {
    return request({
      url: `${api_name}`,
      method: 'post',
      data: courseInfo
    })
  },

  // 根据id获取课程信息
  getCourseInfoById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },

  // 删除
  removeById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },

  // 修改
  updateCourseInfoById(courseInfo) {
    return request({
      url: `${api_name}`,
      method: 'put',
      data: courseInfo
    })
  },

  getCoursePublishInfoById(id) {
    return request({
      url: `${api_name}/course-publish-info/${id}`,
      method: 'get'
    })
  },

  publishCourse(id) {
    return request({
      url: `${api_name}/publish-course/${id}`,
      method: 'put'
    })
  }
}
