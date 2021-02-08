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

export function getMerchantDashBoardData() {
  return request({
    url: '/codeworld-order/web/get-merchant-dashboard-data',
    method: 'post'
  })
}

export function getMerchantInfo() {
  return request({
    url: '/codeworld-merchant/web/get-merchant-info',
    method: 'post'
  })
}

export function getUserRoleToMerchant(userName) {
  return request({
    url: '/codeworld-system/user/get-user-role-to-merchant',
    method: 'get',
    params: {userName}
  })
}
