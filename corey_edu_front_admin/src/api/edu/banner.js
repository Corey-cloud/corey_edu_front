import request from '@/utils/request'

const api_name = '/edu/admin/banner'

export default {

  // 获取轮播图列表
  getBannerList(page, limit) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get'
    })
  },

  // 添加轮播图
  saveBanner(bannerInfo) {
    return request({
      url: `${api_name}`,
      method: 'post',
      data: bannerInfo
    })
  },

  // 根据id获取轮播图
  getBannerById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },

  // 修改
  updateBannerById(bannerInfo) {
    return request({
      url: `${api_name}`,
      method: 'put',
      data: bannerInfo
    })
  },

  // 删除
  removeBannerById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  }
}
