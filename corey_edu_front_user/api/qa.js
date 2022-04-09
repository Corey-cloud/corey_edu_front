import request from '@/utils/request';

export default {
  // 获取问答类型
  getTypes() {
    return request({
      url: `/edu/qa-qt/getTypes`,
      method: 'get',
    })
  },
  publishQ(data) {
    return request({
      url: `/edu/qa-question/publish`,
      method: 'post',
      data: data
    })
  },
  //获取前端问答列表
  getQuestionList(pageNo, pageSize, data) {
    return request({
      url: `/edu/qa-question/getQuestionList/${pageNo}/${pageSize}`,
      method: 'post',
      data: data
    })
  },
  //获取前端问答信息
  getQtAnswerList(id) {
    return request({
      url: `/edu/qa-question/getQtAnswerList/${id}`,
      method: 'get'
    })
  },
  //一级回复
  reply1Answer(data) {
    return request({
      url: `/edu/qa-answer/reply`,
      method: 'post',
      data: data
    })
  },
  //二级回复
  reply2Answer(data) {
    return request({
      url: `/edu/qa-second-answer/2Reply`,
      method: 'post',
      data: data
    })
  },
}