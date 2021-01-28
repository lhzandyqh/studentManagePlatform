import request from '@/utils/request'

// 获取所有的奖学金项目情况
export function getAllScholarshipData() {
  return request({
    url: '/yz_student/awardAssisManage/getSScholarshipInfo',
    method: 'get'
  })
}

// 新增一个奖学金项目
export function addNewScholarshipProject(parems) {
  return request({
    url: '/yz_student/awardAssisManage/setScholarshipInfo',
    method: 'post',
    data: parems
  })
}

// 修改奖学金项目的状态
export function editScholarshipStatus(parems) {
  return request({
    url: '/yz_student/awardAssisManage/setScholarshipStatusById',
    method: 'post',
    params: parems
  })
}

// 根据条件查询奖学金信息
export function queryScholarshipByCondition(parems) {
  return request({
    url: '/yz_student/awardAssisManage/getScholarshipInfoByApplyStatus',
    method: 'get',
    params: parems
  })
}

// 获取所有待审核的奖学金申请
export function getAllScholarshipApplyList() {
  return request({
    url: '/yz_student/awardAssisManage/getScholarshipApplyInfoUnAudit',
    method: 'get'
  })
}

// 奖学金审核
export function scholarshipAuditing(parems) {
  return request({
    url: '/yz_student/awardAssisManage/setSScholarshipApplyInfoAudit',
    method: 'post',
    params: parems
  })
}

// 根据审核状态搜索审核记录
export function getScholarshipByStatus(parems) {
  return request({
    url: '/yz_student/awardAssisManage/getSScholarshipApplyInfoByAuditStatus',
    method: 'get',
    params: parems
  })
}

// 获取奖学金项目历史
export function getScholarshipHistory(parems) {
  return request({
    url: '/yz_student/awardAssisManage/getScholarshipApplyAuditedInfos',
    method: 'get'
  })
}

// 根据年度搜索奖学金历史
export function getScholarshipHistoryByYears(parems) {
  return request({
    url: '/yz_student/awardAssisManage/getScholarshipApplyAuditedByYear',
    method: 'get',
    params: parems
  })
}

// 获取奖学金的获奖名单
export function getScholarshipPeopleList(parems) {
  return request({
    url: '/yz_student/awardAssisManage/getScholarshipAwardInfosBySchoId',
    method: 'get',
    params: parems
  })
}
