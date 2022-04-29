import request from '@/utils/request';

const api_name = '/edu/articles';

export default {
  //获取文章列表
  getArticleList(page, limit, articleQuery) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'post',
      data: articleQuery
    })
  },
  //获取排行
  getHotArticle() {
    return request({
      url: `${api_name}/getHotArticle`,
      method: 'get',

    })
  },
  //获取文章信息
  getArticle(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get',
    })
  },
  //提交评论
  commitComment(data) {
    return request({
      url: `/edu/article-comment/auth/save`,
      method: 'post',
      data: data
    })
  },
  //分页获取评论信息
  getCommentList(page, limit, articleId) {
    return request({
      url: `/edu/article-comment/${page}/${limit}`,
      method: 'get',
      params: { articleId }
    })
  },
  hitZan(id) {
    return request({
      url: `${api_name}/hitZan/${id}`,
      method: 'get',
    })
  },
  zan(id) {
    return request({
      url: `/edu/article-comment/zan/${id}`,
      method: 'put',
    })
  },
}
