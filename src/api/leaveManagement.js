import request from '@/utils/request'

// 获取所有待审核的请假申请
export function getAllAuditingList() {
  return request({
    url: '/yz_student/stuLeave/getAllLeaveUnchecked',
    method: 'get'
  })
}

// 根据请假类型获取请假申请
export function getAuditingListByType(parems) {
  return request({
    url: '/yz_student/stuLeave/getAllLeaveByType',
    method: 'get',
    params: parems
  })
}

// 审核请假申请
export function auditingLeaveList(parems) {
  return request({
    url: '/yz_student/stuLeave/checkOneLeave',
    method: 'post',
    params: parems
  })
}

// 获取请假审核历史
export function getAllAuditingHistory() {
  return request({
    url: '/yz_student/stuLeave/getLeaveCheckHistory',
    method: 'get'
  })
}

