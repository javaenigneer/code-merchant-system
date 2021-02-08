import request from '@/utils/request';

export function getPageMerchant(query) {
  return request({
    url: '/codeworld-merchant/get-page-merchant',
    method: 'post',

    data: query
  });
}

export function examineMerchant(param) {
  return request({
    url: '/codeworld-merchant/examine-merchant',
    method: 'post',
    data: param
  });
}

export function updateMerchantInfo(editMerchantInfo) {
  return request({
    url: '/codeworld-merchant/update-merchant-info',
    method: 'post',
    data: editMerchantInfo
  });
}






