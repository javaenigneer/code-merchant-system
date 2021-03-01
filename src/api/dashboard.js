import request from '@/utils/request'

export function getServerInfo() {
  return request({
    url: '/api/server',
    method: 'get'
  })
}

// 商户入驻
export function merchantSettled(form) {
  return request({
    url: '/codeworld-merchant/merchant-settled',
    method: 'post',
    data: form
  })
}
// 判断商户是否入驻
export function judgmentMerchantSet() {
  return request({
    url: '/codeworld-merchant/judgment-merchant-set',
    method: 'get'
  })
}

// 获取商户dashboard的数据
export function getMerchantDashBoardData() {
  return request({
    url: '/codeworld-order/web/get-merchant-dashboard-data',
    method: 'post'
  })
}
// 获取商户信息
export function getMerchantInfo() {
  return request({
    url: '/codeworld-merchant/web/get-merchant-info',
    method: 'post'
  })
}

// 根据用户名获取商户角色
export function getUserRoleToMerchant(userName) {
  return request({
    url: '/codeworld-system/user/get-user-role-to-merchant',
    method: 'get',
    params: {userName}
  })
}
// 修改密码
export function resetPassword(form) {
  return request({
    url: '/codeworld-merchant/web/reset-password',
    method: 'post',
    data: form
  })
}
