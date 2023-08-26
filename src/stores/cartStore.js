// 封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    // 是否登录状态
    const useStore = useUserStore()
    const isLogin = computed(() => useStore.userInfo.token)
    // 1、定义state - cartList
    const cartList = ref([])

    // 获取最新购物车列表
    const updateNewList = async () => {
      const res = await findNewCartListAPI()
      cartList.value = res.result
    }
    // 2、定义action - addCart
    const addCart = async (goods) => {
      const { skuId, count } = goods
      if (isLogin.value) {
        // 登录之后的加入购物车逻辑
        // 加入购物车
        await insertCartAPI({ skuId, count })
        // 覆盖本地购物车列表
        updateNewList()
      } else {
        // 添加购物车操作
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          // 已添加过 - 原来购物车数量+添加的数量
          item.count += goods.count
        } else {
          // 没有添加过 - 直接push
          cartList.value.push(goods)
        }
      }
    }
    // 3、定义action - delCart
    const delCart = async (skuId) => {
      if (isLogin.value) {
        // 登录之后的删除购物车逻辑
        await delCartAPI([skuId])
        // 覆盖本地购物车列表
        updateNewList()
      } else {
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        if (idx !== -1) {
          // 商品在购物车-删除
          cartList.value.splice(idx, 1)
        }
      }
    }

    // 4、定义action - 清除购物车
    const clearCart = () => {
      cartList.value = []
    }

    // 5、定义computed - 依赖属性变化会立刻计算
    // 总数量=所有商品的count之和
    // reduce函数：第一个参数a 初始化为0， 第二个参数c 是数组当前值，每次运算后将结果赋值给a
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    )
    // 总价=所有商品的count*price之和
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    )
    // 已选商品数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    )
    // 已选择商品价钱合计
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    )
    //6、定义action - 单选功能
    const singleCheck = (skuId, selected) => {
      // 通过skuId找到需修改的一项， 把它修改为传过来的selected
      const item = cartList.value.find((item) => item.skuId == skuId)
      item.selected = selected
    }
    // 7、定义action - 全选功能
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }
    return {
      cartList,
      addCart,
      delCart,
      clearCart,
      updateNewList,
      allCount,
      allPrice,
      singleCheck,
      isAll,
      allCheck,
      selectedCount,
      selectedPrice
    }
  },
  { persist: true }
)
