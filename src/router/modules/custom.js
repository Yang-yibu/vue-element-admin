/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const customRouter = {
  path: '/custom',
  component: Layout,
  redirect: '/custom/other/cus-watermark',
  // redirect: '/nested/menu1/menu1-1',
  name: 'Custom',
  meta: {
    title: 'customComponent',
    icon: 'nested'
  },
  children: [
    {
      path: 'other',
      component: () => import('@/views/components-custom/cus-other/index'), // Parent router-view
      redirect: '/custom/other/cus-watermark',
      name: 'cus-other',
      meta: { title: 'other' },
      children: [
        {
          path: 'cus-watermark',
          component: () => import('@/views/components-custom/cus-other/watermark'),
          name: 'cus-watermark',
          meta: { title: 'watermark' }
        },
        {
          path: 'cus-watermark1',
          component: () => import('@/views/components-custom/cus-other/watermark'),
          name: 'cus-watermark1',
          meta: { title: 'watermark1' },
          hidden: true
        }
      ]
    },
    {
      path: 'table-example',
      component: () => import('@/views/components-custom/cus-other/cus-table-example.vue'),
      name: 'cus-table-example',
      meta: { title: 'pub-table' }
    }
  ]
}

export default customRouter
