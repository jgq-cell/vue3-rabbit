import httpInstance from '@/utils/http'

// 获取banner数据
export function getBannerAPI(params = {}) {
  // 默认为1 商品为2
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}

// 获取新鲜好物数据
export function findNewApi() {
  return httpInstance({
    url: '/home/new'
  })
}
// 获取人气推荐数据
export const getHotAPI = () => {
  return httpInstance({
    url: '/home/hot'
  })
}
// 获取所有商品模块
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}
