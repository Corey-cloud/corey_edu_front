import request from '@/utils/request'
export default {
  // 获取热门课程和讲师列表
  getList() {
    return request({
      url: `/edu/index`,
      method: 'get'
    })
  }
}
