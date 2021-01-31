import request from '@/utils/request'

// 获取所有的助学金申请
export function getAllScholarshipData() {
  return request({
    url: '/yz_student/awardAssisManage/getSStipentApplyInfoUnAudit',
    method: 'get'
  })
}

// 根据审核状态获取助学金申请
export function getHelpMoneyByStatus(parems) {
  return request({
    url: '/yz_student/awardAssisManage/getSStipentApplyInfoByAuditStatus',
    method: 'get',
    params: parems
  })
}

// 助学金审核
export function helpMoneyAuditing(parems) {
  return request({
    url: '/yz_student/awardAssisManage/sStipentApplyInfoAudit',
    method: 'post',
    params: parems
  })
}

// 获取全部助学金历史
export function getHelpHistory(parems) {
  return request({
    url: '/yz_student/awardAssisManage/getSStipentInfos',
    method: 'get'
  })
}

// 根据年份助学金历史
export function getHelpHistoryByYear(parems) {
  return request({
    url: '/yz_student/awardAssisManage/getSStipentInfosByYear',
    method: 'get',
    params: parems
  })
}

// 获取助学金帮扶人员
export function getHelpPeopleList(parems) {
  return request({
    url: '/yz_student/awardAssisManage/getSStipentApplyInfosByStipentId',
    method: 'get',
    params: parems
  })
}

// 获取助学金资金详情
export function getHelpMoneyDetails(parems) {
  return request({
    url: '/yz_student/awardAssisManage/getSStipentInfosByStipentId',
    method: 'get',
    params: parems
  })
}
