import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '../utils/auth'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) { 
  return originalPush.call(this,location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      component: () => import('@/pages/index/index')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      component: () => import('@/pages/account/login')
    },
    {
      path: '/reg',
      name: 'reg',
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      component: () => import('@/pages/account/reg')
    },
    {
      path: '/changepw',
      name: 'changepw',
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      component: () => import('@/pages/account/changepw')
    },
    {
      path: '/changepay',
      name: 'changepay',
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      component: () => import('@/pages/account/changepay')
    },
    {
      path: '/mall',
      name: 'mall',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/mall/mall')
    },
    {
      path: '/milled',
      name: 'milled',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/milled/milled')
    },
    {
      path: '/trading',
      name: 'trading',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/trading/trading'),
    },
    {
      path: '/trading/center',
      name: 'center',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/trading/tradCenter')
    },
    {
      path: '/trading/release',
      name: 'release',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/trading/tradRelease')
    },
    {
      path: '/trading/order',
      name: 'order',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/trading/tradOrder')
    },
    {
      path: '/user',
      name: 'user',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/user/index')
    },
    {
      path:'/user/account',
      name: 'account',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/user/account/allbill')
    },
    {
      path:'/user/info',
      name: 'vipinfo',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/user/vipinfo/vipinfo'),
    },
    {
      path:'/user/realname',
      name: 'realname',
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      component: () => import('@/pages/user/vipinfo/realname'),
    },
    {
      path:'/user/collecard',
      name: 'collecard',
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      component: () => import('@/pages/user/vipinfo/collecard'),
    },
    {
      path:'/user/addresscard',
      name: 'addresscrd',
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      component: () => import('@/pages/user/vipinfo/addresscard'),
    },
    {
      path:'/user/walletcard',
      name: 'walletcard',
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      component: () => import('@/pages/user/vipinfo/walletcard'),
    },
    {
      path: '/user/service',
      name: 'service',
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      component: () => import('@/pages/user/service')
    },
    {
      path: '/user/news',
      name: 'news',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/user/news/news')
    },
    {
      path: '/user/rule',
      name: 'rule',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/user/news/rule'),
    },
    {
      path: '/user/change',
      name: 'change',
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      component: () => import('@/pages/user/news/change'),
    },
    {
      path: '/user/avator',
      name: 'avator',
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      component: () => import('@/pages/user/news/avator'),
    },
    {
      path: '/user/news/notice',
      name: 'notice',
      meta: {
        keepAlive: false, //此组件不需要被缓存
      },
      component: () => import('@/pages/user/news/noticenews')
    },
    {
      path: '/user/guild',
      name: 'guild',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/user/myguild/netCard')
    },
    {
      path: '/user/commguild',
      name: 'commguild',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/user/myguild/commguild')
    },
    {
      path: '/user/extension',
      name: 'extension',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/user/extension')
    },
    {
      path: '/user/book',
      name: 'whitebook',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/user/whitebook')
    },
    {
      path: '/user/center',
      name: 'servicecenter',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/user/servicecenter')
    },
    {
      path: '/user/invest',
      name: 'invest',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/pages/user/invest')
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isLogin = getToken()
  if (isLogin) {
    next()
  } else { 
    if (to.path == '/login' || to.path == '/reg' || to.path == '/changepw') {//判断是否需要登录
      next()
    }else{
      next('/login');
    }
  }
})
export default router
