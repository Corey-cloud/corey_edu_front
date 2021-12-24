import request from '@/utils/request'

const api_name = '/eduservice/edu-subject'

export default {
  getNestedTreeList() {
    return request({
      url: `${api_name}`,
      method: 'get'
    })
  }
}
