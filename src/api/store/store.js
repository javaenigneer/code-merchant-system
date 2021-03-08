import request from '@/utils/request';

// 获取商户下的店铺列表
export function getMerchantStorePage(query) {
  return request({
    url: '/codeworld-store/web/get-merchant-store-page',
    method: 'post',
    data: query
  });
}

// 创建店铺
export function createStore(form) {
  return request({
    url: '/codeworld-store/web/create-store',
    method: 'post',
    data: form
  });
}
