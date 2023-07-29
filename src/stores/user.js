import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 管理用户数据管理
  const userInfo = ref([])

  // action 获取导航数据的方法
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
  }

  // 暴露出管理的数据和方法
  return {
    userInfo,
    getUserInfo
  }
})
