import request from '@/utils/request'

const api_name = '/eduservice/edu-course'

export default {
  // 添加课程信息
  saveCourseInfo(courseInfo) {
    return request({
      url: `${api_name}/addCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },

  getCourseInfoById(id) {
    return request({
      url: `${api_name}/course-info/${id}`,
      method: 'get'
    })
  },

  updateCourseInfoById(courseInfo) {
    return request({
      url: `${api_name}/update-course-info/${courseInfo.id}`,
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
  },
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  }
}
