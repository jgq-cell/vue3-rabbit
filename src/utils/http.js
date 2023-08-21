// axios基础封装
import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'

// 创建axios接口实例
const httpInstance = axios.create({
  // 基地址
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  // 超时时间
  timeout: 5000
})

// axios请求拦截器
// 请求接口之前做的处理：通常会将token注入到header
httpInstance.interceptors.request.use(
  (config) => {
    // 1、pinia获取token数据
    const userStore = useUserStore()
    // 2、按照后端要求拼接token数据
    const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (e) => Promise.reject(e)
)

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore()
    // 统一错误提示
    ElMessage({
      type: 'warning',
      message: e.response.data.message
    })
    // 401token失效处理
    if (e.response.status == 401) {
      // 1、清除本地用户数据
      userStore.clearUserInfo()
      // 2、跳转登录页
      router.push({ path: '/login' })
    }

    return Promise.reject(e)
  }
)

export default httpInstance
