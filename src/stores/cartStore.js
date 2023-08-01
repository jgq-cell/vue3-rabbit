// 封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    // 1、定义state - cartList
    const cartList = ref([])
    // 2、定义action - addCart
    const addCart = (goods) => {
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
    // 3、定义action - delCart
    const delCart = (skuId) => {
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      if (idx !== -1) {
        // 商品在购物车-删除
        cartList.value.splice(idx, 1)
      }
    }
    // 4、定义computed - 依赖属性变化会立刻计算
    // 总数量=所有商品的count之和
    // reduce函数：第一个参数a 初始化为0， 第二个参数c 是数组当前值，每次运算后将结果赋值给a
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    )
    // 总价=所有商品的count*price之和
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    )

    // 5、定义action - 单选功能
    const singleCheck = (skuId, selected) => {
      // 通过skuId找到需修改的一项， 把它修改为传过来的selected
      const item = cartList.value.find((item) => item.skuId == skuId)
      item.selected = selected
    }
    // 6、定义action - 全选功能
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }
    return {
      cartList,
      addCart,
      delCart,
      allCount,
      allPrice,
      singleCheck,
      isAll,
      allCheck
    }
  },
  { persist: true }
)
