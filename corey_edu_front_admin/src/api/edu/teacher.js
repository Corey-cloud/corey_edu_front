import request from '@/utils/request'

export default {

  // 1 讲师列表（条件查询带分页）
  // page当前页 limit每页记录数 teacherQuery条件对象
  getTeacherListPage(page, limit, teacherQuery) {
    return request({
      url: `/eduservice/edu-teacher/pageTeacherCondition/${page}/${limit}`,
      method: 'post',
      // teacherQuery条件对象，后端使用RequestBody获取数据
      // data表示把对象装换json进行传递到接口里面
      data: teacherQuery
    })
  },
  // 2 根据ID逻辑删除讲师
  removeById(teacherId) {
    return request({
      url: `/eduservice/edu-teacher/${teacherId}`,
      method: 'delete'
    })
  },
  // 3 新增讲师
  save(teacher) {
    return request({
      url: `/eduservice/edu-teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  // 4 根据ID查询讲师
  getById(id) {
    return request({
      url: `/eduservice/edu-teacher/${id}`,
      method: 'get'
    })
  },
  // 5 修改讲师
  updateById(teacher) {
    return request({
      url: `/eduservice/edu-teacher/${teacher.id}`,
      method: 'put',
      data: teacher
    })
  },
  // 6 获取讲师列表
  getList() {
    return request({
      url: `/eduservice/edu-teacher`,
      method: 'get'
    })
  }
}
