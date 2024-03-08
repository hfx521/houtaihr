// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// //路由前置守卫  到哪里去 从哪里来 下一步函数
// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()
//   //进度条

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// //路由后置守卫
// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
import router from "@/router"
import nProgress from "nprogress"
import 'nprogress/nprogress.css'
import store from "./store"

//前置守卫

const whiteList = ["/login" , "/404"]
router.beforeEach((to,from,next) => {
  nProgress.start() //开启进度条
  if(store.getters.token) {
    //存在token
    if(to.path === "/login") {
      //跳转到主页
      next('/') //中转页面 主页  next里面有地址的情况下 没有执行后置守卫
      nProgress.done()
    } else {
      next() //放过
    }
  }else {
    //没有token 
    if(whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')  //中转到登录页
      nProgress.done() 
    }
  }
})

// 后置守卫
router.afterEach(() => {
  console.log('123')
  nProgress.done() //关闭进度条
})
