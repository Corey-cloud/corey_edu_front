import request from '@/utils/request'

const api_name = '/edu/collect'

export default {
    // 收藏课程
    collectCourse(collectBody) {
        return request({
            url: `${api_name}`,
            method: 'post',
            data: collectBody
        })
    },

    // 获取课程收藏列表
    list(memberId) {
        return request({
            url: `${api_name}/${memberId}`,
            method: 'get'
        })
    },

    // 取消收藏
    cancel(memberId, courseId) {
        return request({
            url: `${api_name}`,
            method: 'delete',
            params: {memberId, courseId}
        })
    }
}