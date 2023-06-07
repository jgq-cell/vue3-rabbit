// 引入目标元素的可见性监听
import { useIntersectionObserver } from '@vueuse/core'

//  定义懒加载插件
export const lazyPlugin = {
  install(app) {
    // 注册全局指令-在所有组件都可用
    app.directive('img-lazy', {
      mounted(el, binding) {
        // el: 指定绑定到的元素 img
        // binding: binding.value， 指令等于号后面绑定的表达式的值 图片url
        // console.log(el, binding.value)
        const { stop } = useIntersectionObserver(
          // el: 监听对象
          // isIntersecting: 监听对象是否进入可视区域
          el,
          ([{ isIntersecting }]) => {
            // console.log(isIntersecting)
            if (isIntersecting) {
              // 进入视口区域，将指令携带值赋值给src
              el.src = binding.value
              // 完成资源懒加载后，停止useIntersectionObserver可视监听
              stop()
            }
          }
        )
      }
    })
  }
}
