import request from '@/utils/request'
const api_name = '/aliyun/vod/videos'
export default {
  removeById(id) {
    return request({
      url: `${api_name}/id`,
      method: 'delete'
    })
  }
}

