import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
//import { Main } from 'element-ui'

Vue.use(VueRouter)

//1. 创建路由组件，每个路由对应一个组件,在views文件夹下
//2. 将路由与组件进行映射，如下

const routes = [
  //主路由
  {
    path:'/',
    component:Main,
    redirct:"/home",//重定向到首页
    children:[//子路由或者嵌套路由是一个列表,因此自然要到main.vue里面去配置子路由的出口
      { path: '/home', component: Home },
      { path: '/user', component: User },
      { path: '/mall', component: Mall},
      { path: '/page1', component: PageOne },
      { path: '/page2', component: PageTwo },
    ] 
  }

  // { path: '/home', component: Home },
  // { path: '/user', component: User },
  //{ path: '/Main', component: Main }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})


//对外暴露router实例
export default router

// 4. 创建和挂载根实例。main.js
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能