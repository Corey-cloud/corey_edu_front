import request from '@/utils/request'
export default {
  //登录
  submitLogin(userInfo) {
    return request({
      url: `/ucenter/member/login`,
      method: 'post',
      data: userInfo
    })
  },
  //获取用户信息
  getLoginUserInfo() {
    return request({
      url: `/ucenter/member/auth/getLoginInfo`,
      method: 'get',
      headers: {'token': cookie.get('guli_token')}
    })
    //headers: {'token': cookie.get('guli_token')}
  }
}
