import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const index = () => import ('@/components/index/index');
const order=()=>import('@/components/order/order')
const orderdetail=()=>import('@/components/order/orderdetail')
const menu=()=>import('@/components/mymenu/menu')
const invoic=()=>import('@/components/invoicing/invoicing')

export default new Router({
  inkActiveClass: 'activeRoute',
  mode: "history",
  routes: [
    {path: '/', redirect: 'index'},
    {
      path:"/index",
      component:index,
    },
    {
      path:"/order",
      component:order,
    },
    {
      path:"/orderdetail",
      component:orderdetail,
    },
    {
      path:"/menu",
      component:menu,
    },
    {
      path:"/invoic",
      component:invoic,
    },     
  ]
})
