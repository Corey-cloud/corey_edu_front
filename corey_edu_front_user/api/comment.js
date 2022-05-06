import request from '@/utils/request'
export default {
  getPageList(page, limit, courseId) {
    return request({
      url: `/edu/comments/${page}/${limit}`,
      method: 'get',
      params: { courseId }
    })
  },
  addComment(comment) {
    return request({
      url: `/edu/comments/auth/save`,
      method: 'post',
      data: comment
    })
  },
  zan(id) {
    return request({
      url: `/edu/comments/zan/${id}`,
      method: 'put',
    })
  },
}
