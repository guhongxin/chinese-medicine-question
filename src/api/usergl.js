import request from '@/utils/request'

// 账号列表
export function userGetList(data) {
  return request({
    url: '/user/getList',
    method: 'GET',
    params: data
  })
}
// 添加用户
export function addUser(data) {
  return request({
    url: '/user/addUser',
    method: 'POST',
    data
  })
}
// 编辑用户
export function editUser(data) {
  return request({
    url: '/user/editUser',
    method: 'POST',
    data
  })
}

// 用户列表
export function questionnaireGetList(data) {
  return request({
    url: '/questionnaire/getList',
    method: 'GET',
    params: data
  })
}

// 填写/修改 机构信息 接口
export function organizationSaveOz(data) {
  return request({
    url: '/organization/saveOz',
    method: 'POST',
    data
  })
}

// 获取机构信息 接口
export function organizationGetOz(data) {
  return request({
    url: '/organization/getOz',
    method: 'GET',
    params: data
  })
}

// 问卷暂存/保存 接口
export function questionnaireSaveQn(data) {
  return request({
    url: '/questionnaire/saveQn',
    method: 'POST',
    data
  })
}

// 获取问卷信息 接口
export function questionnairegetQn(data) {
  return request({
    url: '/questionnaire/getQn',
    method: 'GET',
    params: data
  })
}

