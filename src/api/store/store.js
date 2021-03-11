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

// 根据店铺名称模糊查询店铺
export function getStoreByName(name) {
  return request({
    url: '/codeworld-store/web/get-store-name',
    method: 'post',
    params: { name }
  });
}

// 根据店铺id查询店铺分类
export function getStoreCategoryByStoreId(storeId) {
  return request({
    url: '/codeworld-store/web/get-store-category-store-id',
    method: 'post',
    params: { storeId }
  });
}
