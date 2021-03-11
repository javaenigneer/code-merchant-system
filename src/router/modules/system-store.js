/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const systemStore = {
  path: '/systemStore',
  component: Layout,
  alwaysShow: true,
  name: '店铺管理',
  redirect: 'noredirect',
  meta: {
    title: '店铺管理',
    icon: 'component',
    resources: 'systemStore'
  },
  children: [
    {
      path: 'store',
      component: () => import('@/views/system-store/store'),
      name: '店铺列表',
      meta: { title: '店铺列表', icon: 'my-user', noCache: true, resources: 'user' }
    },
    {
      path: 'store-category',
      component: () => import('@/views/system-store/store-category'),
      name: '店铺分类',
      meta: { title: '店铺分类', icon: 'my-user', noCache: true, resources: 'user' }
    },
    {
      path: 'new-add-store',
      component: () => import('@/views/system-store/new-add-store'),
      name: '新建店铺',
      meta: { title: '新建店铺', icon: 'my-user', noCache: true, resources: 'user' },
      hidden: true
    },
    {
      path: 'set-store',
      component: () => import('@/views/system-store/set-store'),
      name: '店铺设置',
      meta: { title: '店铺设置', icon: 'my-user', noCache: true, resources: 'user' },
      hidden: true
    }
  ]
};

export default systemStore
