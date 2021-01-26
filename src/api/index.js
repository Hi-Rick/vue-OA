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
//1
export function deleteDepartment(query) {
  return request({
    url: '/backoa/addressList/deleteDepartment',
    method: 'get',
    params: query
  })
}
//
export function getAllAddress(query) {
  return request({
    url: '/backoa/addressList/getAllAddress',
    method: 'post',
    params: query
  })
}
//3
export function insertDepartment(query) {
  return request({
    url: '/backoa/addressList/insertDepartment',
    method: 'get',
    params: query
  })
}
export function modifyDepartment(query) {
  return request({
    url: '/backoa/addressList/modifyDepartment',
    method: 'get',
    params: query
  })
}
export function deleteAddress(query) {
  return request({
    url: '/backoa/addressList/deleteAddress',
    method: 'post',
    params: query
  })
}
export function findConferenceRoomByName(query) {
  return request({
    url: '/backoa/conferenceRoom/findConferenceRoomByName',
    method: 'get',
    params: query
  })
}
export function selectByData(query) {
  return request({
    url: '/backoa/conferenceRoom/selectByData',
    method: 'get',
    params: query
  })
}
export function findAllConferenceRoom(query) {
  return request({
    url: '/backoa/conferenceRoom/findAllConferenceRoom',
    method: 'get',
    params: query
  })
}
export function deleteRoom(query) {
  return request({
    url: '/backoa/conferenceRoom/deleteRoom',
    method: 'post',
    params: query
  })
}
export function findConferenceRoomById(query) {
  return request({
    url: '/backoa/conferenceRoom/findConferenceRoomById',
    method: 'get',
    params: query
  })
}
export function modifyRoomInfo(data) {
  return request({
    url: '/backoa/conferenceRoom/modifyRoomInfo',
    method: 'post',
    data
  })
}
export function createDocument(data) {
  return request({
    url: '/backoa/document/createDocument',
    method: 'post',
    data
  })
}
export function addConferenceRoom(data) {
  return request({
    url: '/backoa/conferenceRoom/addConferenceRoom',
    method: 'post',
    data
  })
}
export function selectByWeek(query) {
  return request({
    url: '/backoa/conferenceRoom/selectByWeek',
    method: 'get',
    params: query
  })
}
export function findNotApproveDocument(query) {
  return request({
    url: '/backoa/document/findNotApproveDocument',
    method: 'get',
    params: query
  })
}
export function addProcess(data) {
  return request({
    url: '/backoa/document/addProcess',
    method: 'post',
    data
  })
}
export function select(query) {
  return request({
    url: '/backoa/document/select',
    method: 'get',
    params: query
  })
}
export function findFinishApprove(query) {
  return request({
    url: '/backoa/document/findFinishApprove',
    method: 'get',
    params: query
  })
}
export function modifyProcess(data) {
  return request({
    url: '/backoa/document/modifyProcess',
    method: 'post',
    data
  })
}
export function getAllUsers(query) {
  return request({
    url: '/backoa/user/getAllUsers',
    method: 'post',
    params: query
  })
}
export function getAllRole(query) {
  return request({
    url: '/backoa/user/getAllRole',
    method: 'get',
    params: query
  })
}
export function deleteRole(query) {
  return request({
    url: '/backoa/user/deleteRole',
    method: 'post',
    params: query
  })
}
export function insertPermission(data) {
  return request({
    url: '/backoa/user/insertPermission',
    method: 'post',
    data
  })
}
export function getUserByRole(query) {
  return request({
    url: '/backoa/user/getUserByRole',
    method: 'get',
    params: query
  })
}
export function setUserRole(query) {
  return request({
    url: '/backoa/user/setUserRole',
    method: 'post',
    params: query
  })
}
export function getPermissionByRole(query) {
  return request({
    url: '/backoa/user/getPermissionByRole',
    method: 'get',
    params: query
  })
}
