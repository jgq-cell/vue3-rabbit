import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 引入初始化样式
import '@/styles/common.scss'
// 引入懒加载指令插件并注册
import { lazyPlugin } from './directives'
// 引入全局组件并注册
import { componentPlugin } from '@/components'

const app = createApp(App)
const pinia = createPinia()
// 注册持久化插件
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')
