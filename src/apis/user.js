import httpInstance from '@/utils/http'

// 封装用户相关的接口函数
export const loginAPI = ({ account, password }) => {
  return httpInstance({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}
