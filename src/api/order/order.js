import request from '@/utils/request';

export function getWebPageMerchantOrder(query) {
  return request({
    url: '/codeworld-order/web/get-page-merchant-order',
    method: 'post',
    data: query
  });
}

export function getOrderInfoById(orderDetailId) {
  return request({
    url: '/codeworld-order/get-order-info-id',
    method: 'post',
    params: {orderDetailId}
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
    url: '/codeworld-order/web/get-page-merchant-order-return',
    method: 'post',
    data: query
  });
}

// 获取退款退货商品详情
export function getOrderReturnInfo(orderReturnId) {
  return request({
    url: '/codeworld-order/web/get-order-return-info',
    method: 'post',
    params: {orderReturnId}
  });
}


export function receiveProcess(orderProcessRequest) {
  return request({
    url: '/codeworld-order/web/receive-processing-service-order',
    method: 'post',
    data: orderProcessRequest
  });
}

export function refuseProcess(orderProcessRequest) {
  return request({
    url: '/codeworld-order/web/refuse-process-service-order',
    method: 'post',
    data: orderProcessRequest
  });
}

export function exportOrder() {
  return request({
    url: '/codeworld-order/web/export-order',
    method: 'post'
  });
}
