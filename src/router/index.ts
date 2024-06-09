import { createRouter, createWebHistory } from 'vue-router'

import ProductsList from '@/views/ProductsList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products_list',
      component: ProductsList
    },
    {
      path: '/product/add',
      name: 'add_product',
      component: () => import("../views/AddProductForm.vue")
    },
    {
      path: '/cart',
      name: 'cart_items_list',
      component: ()=> import("../views/CartItemsList.vue")
    }
  ]
})

export default router
