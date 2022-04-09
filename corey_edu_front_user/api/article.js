import request from '@/utils/request';

const api_name = '/edu/articles';

export default {
  //获取文章列表
  getContentList(pageNo, pageSize) {
    return request({
      url: `${api_name}/${pageNo}/${pageSize}`,
      method: 'get',

    })
  },
  //获取排行
  getHotContent() {
    return request({
      url: `${api_name}/getHotContent`,
      method: 'get',

    })
  },
  //获取文章信息
  getContent(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get',
    })
  },
  //提交评论
  commitComment(data) {
    return request({
      url: `/educms/cms-comment-front/commitComment`,
      method: 'post',
      data: data
    })
  },
  //分页获取评论信息
  getCommentList(pageNo, pageSize, contentId) {
    return request({
      url: `/educms/cms-comment-front/getFrontComment/${pageNo}/${pageSize}`,
      method: 'get',
      params: { contentId }
    })
  },
  hitZan(id) {
    return request({
      url: `${api_name}/hitZan/${id}`,
      method: 'get',
    })
  },
}
