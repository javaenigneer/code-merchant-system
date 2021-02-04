import request from '@/utils/request';

export function getWebPageMerchantOrder(query) {
  return request({
    url: '/codeworld-order/web/get-page-merchant-order',
    method: 'post',
    data: query
  });
}

export function getOrderInfoById(orderId) {
  return request({
    url: '/codeworld-order/get-order-info-id',
    method: 'post',
    params: {orderId}
  });
}

export function getReceiverAddressById(addressId) {
  return request({
    url: '/codeworld-member/address/get-receiver-address-id',
    method: 'post',
    params: {addressId}
  });
}
// 订单发货
export function orderDelivery(orderDeliveryMessage) {
  return request({
    url: '/codeworld-order/order-delivery',
    method: 'post',
    data: orderDeliveryMessage
  });
}

// 获取商户下订单退款退货列表
export function getPageMerchantOrderReturn(query) {
  return request({
    url: '/codeworld-order/get-page-merchant-order-return',
    method: 'post',
    data: query
  });
}

// 获取退款退货商品详情
export function getOrderReturnInfo(orderReturnId) {
  return request({
    url: '/codeworld-order/get-order-return-info',
    method: 'post',
    params: {orderReturnId}
  });
}


export function receiveProcess(orderReturnId) {
  return request({
    url: '/codeworld-order/receive-processing-service-order',
    method: 'post',
    params: {orderReturnId}
  });
}

export function refuseProcess(orderReturnId) {
  return request({
    url: '/codeworld-order/refuse-process-service-order',
    method: 'post',
    params: {orderReturnId}
  });
}

export function exportOrder() {
  return request({
    url: '/codeworld-order/export-order',
    method: 'post'
  });
}
