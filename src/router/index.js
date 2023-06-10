import { createRouter, createWebHistory } from 'vue-router'
// createRouter: 创建router实例对象
// createWebHistory： 创建history模式的路由

// vite引擎需要写到index.vue，否则无法识别
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // routes: 配置path和component对应关系的位置
  routes: [
    // 一级路由
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '', // 默认二级路由：当访问父路由时，会默认访问子组件
          component: Home
        },
        {
          path: '/category/:id',
          component: Category
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router
