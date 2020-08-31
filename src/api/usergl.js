import request from '@/utils/request'

// 添加用户
export function addUser(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}

// 填写/修改 机构信息 接口
export function organizationSaveOz(data) {
  return request({
    url: '/organization/saveOz',
    method: 'post',
    data
  })
}

// 获取机构信息 接口
export function organizationGetOz(data) {
  return request({
    url: '/organization/getOz',
    method: 'post',
    data
  })
}

// 问卷暂存/保存 接口
export function questionnaireSaveQn(data) {
  return request({
    url: '/questionnaire/saveQn',
    method: 'post',
    data
  })
}

