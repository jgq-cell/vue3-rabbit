// 封装分类数据业务相关代码
import { getCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useRoute } from 'vue-router'
const route = useRoute()

export function useCategory() {
  const categoryData = ref({})
  const getCategory = async (id = route.params.id) => {
    // route.params: 获取路由参数方式与路由配置保持一致
    const res = await getCategoryAPI(id) // route.params.id
    categoryData.value = res.result
  }
  // "/category/idxxx"  多个路由渲染同个组件，复用（不销毁创建实例）导致生命周期钩子不会被调用
  // 解决思路：
  // 1、组件实例不复用，强制销毁创建--> router-view添加key--> 缺点：组件所有请求都会重新发送存在资源浪费
  // 2、监听路由变化，一旦变化执行数据更新 --> beforeRouteUpdate导航钩子，在路由更新之前执行
  onMounted(() => getCategory())
  // 目标：在路由参数变化的时候 可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    // 存在参数：使用最新的路由参数请求最新的分类数据
    getCategory(to.params.id)
  })

  return {
    categoryData
  }
}
