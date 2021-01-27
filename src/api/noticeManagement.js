import request from '@/utils/request'

// 根据不同状态获取通知 0为草稿箱 1为已发布 2为已删除
export function getNoticeByStatus(parems) {
  return request({
    url: '/rectification/functions/backStage/selectZgNotice',
    method: 'get',
    params: parems
  })
}

// 新增通知
export function addNewNotice(parems) {
  return request({
    url: '/rectification/functions/backStage/addZgNotice',
    method: 'post',
    data: parems
  })
}

// 通知状态修改
export function noticeStateEdit(parems) {
  return request({
    url: '/rectification/functions/backStage/modifyZgNoticeState',
    method: 'post',
    params: parems
  })
}

// 通知内容修改
export function noticeContentEdit(parems) {
  return request({
    url: '/rectification/functions/backStage/modifyZgNotice',
    method: 'post',
    data: parems
  })
}

// 通知删除
export function noticeDelete(parems) {
  return request({
    url: '/rectification/functions/backStage/deleteZgNotice',
    method: 'get',
    params: parems
  })
}

