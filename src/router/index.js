import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import store from '../vuex/store'
import Home from '../components/Home'
import Fenlei from '../components/Fenlei'
import Video from '../components/Video'
import videoPlay from '../components/videoPlay'
import personalSpace from '../components/personalSpace'
import setInfo from '../components/setInfo'
import personalCollection from '../components/personalCollection'
import personalUpload from '../components/personalUpload'

Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path:'/home',
      name:'home',
      meta:{
        requireAuth:true,
        requireOK:true
      },
      component:Home,
      children:[
        {
          path:'personalSpace',
          component:personalSpace,
          meta:{
            requireAuth:true
          },
          children:[
            {
              path:'setInfo',
              component:setInfo,
              meta:{
                requireAuth:true,
              },
            },
            {
              path:'personalCollection',
              component:personalCollection,
              meta:{
                requireAuth:true,
              },
            },
            {
              path:'personalUpload',
              component:personalUpload,
              meta:{
                requireAuth:true,
              },
            }
          ]
        },
        {
          path:'videoPlay/:id',
          component:videoPlay,
          meta:{
            requireAuth:true
          }
        },
        {
          path:'fenlei',
          component:Fenlei,
          meta:{
            requireAuth:true,
            requireOK:true
          },
          children:[
            {
              path:'video',
              component:Video,
              meta:{
                requireAuth:true,
              },
            },
          ]
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireOK) {  // 判断该路由是否显示组件
    next({
      path: '/home/fenlei/video',
      query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  }
  else {
    next();
  }

  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    console.log(store.state.token);
    if (sessionStorage.getItem('token')) {
      store.state.token = sessionStorage.getItem('token');
      next();
    }
    else {
      next({
        path: '/',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})

export default router
