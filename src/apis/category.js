import httpInstance from '@/utils/http'

export const getCategoryAPI = (id) => {
  return httpInstance({
    url: '/category',
    params: {
      id
    }
  })
}

// 获取二级分类列表
export const getCategoryFilterAPI = (id) => {
  return httpInstance({
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}

/**
 * @description: 二级分类-基础列表数据
 * @data {
 *     category: 100500,
 *     page: 1,
 *     pageSize: 20,
 *     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
 *  }
 * @returns {*}
 */
export const getSubCategoryAPI = (data) => {
  return httpInstance({
    url: '/category/goods/temporary',
    method: 'POST',
    data
  })
}
