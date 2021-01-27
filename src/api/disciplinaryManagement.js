import request from '@/utils/request'

// 获取所有的违纪情况
export function getAllDisciplinaryData(parems) {
  return request({
    url: '/rectification/functions/backStage/selectBreachPrinciple',
    method: 'get',
    params: parems
  })
}

// 新增违纪
export function addDisciplinarySituation(parems) {
  return request({
    url: '/rectification/functions/backStage/addBreachPrinciple',
    method: 'post',
    data: parems
  })
}

// 取消处分
export function cancelDisciplinarySituation(parems) {
  return request({
    url: '/rectification/functions/backStage/deleteBreachPrinciple',
    method: 'get',
    params: parems
  })
}

