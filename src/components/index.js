// 插件方式：将components中的组件进行全局化注册
import ImageView from '@/components/ImageView/index.vue'
import XtxSku from '@/components/XtxSku/index.vue'

export const componentPlugin = {
  install(app) {
    // app.component('组件名字', '组件配置对象')
    app.component('XtxImageView', ImageView).component('XtxSku', XtxSku)
  }
}
