import request from '@/utils/request'
export default {
  getPageList(page, limit, courseId) {
    return request({
      url: `/eduservice/comment/${page}/${limit}`,
      method: 'get',
      params: { courseId }
    })
  },
  addComment(comment,token) {
    return request({
      url: `/eduservice/comment/auth/save/${token}`,
      method: 'post',
      data: comment
    })
  }
}
