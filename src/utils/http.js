// axios基础封装
import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'

// 创建axios接口实例
const httpInstance = axios.create({
  // 基地址
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  // 超时时间
  timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    // console.log(config)
    return config
  },
  (e) => Promise.reject(e)
)

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    // 统一错误提示
    ElMessage({
      type: 'warning',
      message: e.response.data.message
    })
    return Promise.reject(e)
  }
)

export default httpInstance
