import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: "",
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('views/home/Home'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('views/category/Category'),
    meta: {
      title: '分类'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('views/cart/Cart'),
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('views/profile/Profile'),
    meta: {
      title: '我的'
    }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('views/detail/Detail'),
    meta: {
      title: '商品详情'
    }
  },
]

const router = new Router({
  mode: 'history',
  routes
})

// 动态改变标题
router.beforeEach((to,form,next) => {
  document.title = to.matched[0].meta.title
  next()
})

export default router
