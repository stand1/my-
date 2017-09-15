import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from '../../node_modules/vue-resource';
import header from '@/components/header/header.vue';
import goods from '@/components/goods/goods.vue';
import ratings from '@/components/ratings/ratings';
import seller from '@/components/seller/seller';

Vue.use(VueRouter);
Vue.use(VueResource);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: goods
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
        path: '/ratings',
        name: 'ratings',
        component: ratings
    },
    {
        path: '/seller',
        name: 'seller',
        component: seller
    },
    {
      path: '/',
      name: 'header',
      component: header
    }
  ]
});
