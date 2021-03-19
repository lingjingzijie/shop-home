import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const login = ()=>import('../pages/login/login.vue')
const index = ()=>import('../pages/index/index.vue')
const home = ()=>import('../pages/home/home.vue')
const menu = ()=>import('../pages/menu/menu.vue')
const role = ()=>import('../pages/role/role.vue')
const manager = ()=>import('../pages/manager/manager.vue')
const cate = ()=>import('../pages/cate/cate.vue')
const spec = ()=>import('../pages/spec/spec.vue')
const goods = ()=>import('../pages/goods/goods.vue')

export default new Router({
  routes: [
    {
      path:'/login',
      component:login,
    },
    {
      path:'/',
      component:index,
      children:[
        {
          path:'home',
          name:'首页',
          component:home
        },
        {
          path:'menu',
          name:'菜单管理',
          component:menu
        },
        {
          path:'role',
          name:'角色管理',
          component:role
        },{
          path:'manager',
          name:'管理员管理',
          component:manager
        },{
          path:'cate',
          name:'商品分类',
          component:cate
        },{
          path:'spec',
          name:'商品规格',
          component:spec
        },{
          path:'goods',
          name:'商品管理',
          component:goods
        },
        {
          path:'',
          redirect:'/home'
        }
      ]
    },
    {
      path:'',
      redirect:'/login'
      
    }
  ]
})
