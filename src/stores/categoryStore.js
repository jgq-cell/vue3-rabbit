import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  // 导航列表数据管理
  // state 导航列表数据
  const CategoryList = ref([])

  // action 获取导航数据的方法
  const getCategory = async () => {
    const res = await getCategoryAPI()
    CategoryList.value = res.result
  }

  // 暴露出管理的数据和方法
  return {
    CategoryList,
    getCategory
  }
})
