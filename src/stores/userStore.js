import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import { mergeCartAPI } from '@/apis/cart'
import { ref } from 'vue'
import { useCartStore } from './cartStore'

export const useUserStore = defineStore(
  'user',
  () => {
    const cartStore = useCartStore()
    // 管理用户数据管理
    // token 用来标识当前用户是否登录，可以保持一定时间有效性，不操作一段时间会失效，再去请求就会出现401错误
    // pinia存储基于内存，刷新会丢失，为了保持登录状态需做持久化存储
    const userInfo = ref({})

    // action 获取导航数据的方法
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      userInfo.value = res.result
      // 合并购物车
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count
          }
        })
      )
      cartStore.updateNewList()
    }
    // action 退出时清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {}
      // 执行清除购物车步骤
      cartStore.clearCart()
    }
    // 暴露出管理的数据和方法
    return {
      userInfo,
      getUserInfo,
      clearUserInfo
    }
  },
  // 用户数据持久化：设置state的同时，会同步在LocalStorege
  { persist: true }
)
