import httpInstance from '@/utils/http'

// 封装axios请求函数并测试
export function getCategory() {
  return httpInstance({
    url: 'home/category/head'
  })
}
