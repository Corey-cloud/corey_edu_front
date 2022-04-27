import request from '@/utils/request';

export default {
  // 获取问答类型
  getTypes() {
    return request({
      url: `/edu/qa-qt/getTypes`,
      method: 'get',
    })
  },
  // 发布问题
  publishQ(data) {
    return request({
      url: `/edu/qa-question/publish`,
      method: 'post',
      data: data
    })
  },
  //获取问答列表
  getQuestionList(pageNo, pageSize, data) {
    return request({
      url: `/edu/qa-question/getQuestionList/${pageNo}/${pageSize}`,
      method: 'post',
      data: data
    })
  },
  getQuestionById(id) {
    return request({
      url: `/edu/qa-question/${id}`,
      method: 'get'
    })
  },
  //获取前端问答回复信息列表
  getQtAnswerList(id) {
    return request({
      url: `/edu/qa-question/getQaAnswerList/${id}`,
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
