import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    // 管理用户数据管理
    // token 用来标识当前用户是否登录，可设置过期时间
    // pinia存储基于内存，刷新会丢失，为了保持登录状态需做持久化存储
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
  },
  // 用户数据持久化：设置state的同时，会同步在LocalStorege
  { persist: true }
)
