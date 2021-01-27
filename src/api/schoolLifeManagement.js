import request from '@/utils/request'

// 根据活动查询活动 0为草稿箱 1为已发布 2为已删除
export function getActivityData(parems) {
  return request({
    url: '/rectification/functions/backStage/selectZgSchoolActivity',
    method: 'get',
    params: parems
  })
}

// 新增活动
export function addNewActivity(parems) {
  return request({
    url: '/rectification/functions/backStage/addZgSchoolActivity',
    method: 'post',
    data: parems
  })
}

// 删除草稿箱内的活动
export function deleteActivityInDraft(parems) {
  return request({
    url: '/rectification/functions/backStage/deleteZgSchoolActivity',
    method: 'get',
    params: parems
  })
}

// 修改活动状态
export function changeActivityState(parems) {
  return request({
    url: '/rectification/functions/backStage/modifyZgSchoolActivityState',
    method: 'post',
    params: parems
  })
}
