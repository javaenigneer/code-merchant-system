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
