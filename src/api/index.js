import request from '@/utils/request'

export function getdaibanList(query) {
  return request({
    url: '/backoa/document/findNotApproveDocument',
    method: 'get',
    params: query
  })
}
export function findAllDepartment(query) {
  return request({
    url: '/backoa/addressList/findAllDepartment',
    method: 'get',
    params: query
  })
}
export function selectByDepartment(query) {
  return request({
    url: '/backoa/addressList/selectByDepartment',
    method: 'post',
    params: query
  })
}
export function selectByName(query) {
  return request({
    url: '/backoa/addressList/selectByName',
    method: 'post',
    params: query
  })
}
export function getUserInfo(query) {
  return request({
    url: '/backoa/user/getUserInfo',
    method: 'post',
    params: query
  })
}
export function getdocselect(query) {
  return request({
    url: '/backoa/document/select2',
    method: 'get',
    params: query
  })
}
