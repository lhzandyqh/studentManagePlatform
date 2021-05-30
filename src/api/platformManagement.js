import request from '@/utils/request'

// 学生用户名单批量导入
export function studentListFileUpload(parems) {
  return request({
    url: '/yz_student/upload/stuExcelUpload',
    method: 'post',
    data: parems
  })
}

// 根据搜索条件从用户名单中找学生
export function getStudentFromListByCondition(parems) {
  return request({
    url: '/yz_student/userlogin/getStudentList',
    method: 'get',
    params: parems
  })
}

// 用户密码重置
export function userPasswordReset(parems) {
  return request({
    url: '/rectification/user/resetPassword',
    method: 'post',
    params: parems
  })
}

// 用户账户注销
export function userAccountCancellation(parems) {
  return request({
    url: '/rectification/user/cancelAccount',
    method: 'post',
    params: parems
  })
}

// 教师名单批量导入
export function teacherListFileUpload(parems) {
  return request({
    url: '/yz_student/upload/teaExcelUpload',
    method: 'post',
    data: parems
  })
}

// 根据搜索条件从用户名单中找教师
export function getTeacherFromListByCondition(parems) {
  return request({
    url: '/yz_student/userlogin/getTeaList',
    method: 'get',
    params: parems
  })
}

// 教师诊改平台权限设置
export function teacherPlatformPermissionSet(parems) {
  return request({
    url: '/rectification/user/updatePermissions',
    method: 'post',
    params: parems
  })
}
