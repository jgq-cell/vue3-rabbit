/* eslint-env node */
module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
  rules: {
    // 解决prettier与eslint规则冲突
    indent: 0,
    'space-before-function-paren': 0,
    // 关闭组件命名规则
    'vue/multi-word-component-names': 'off'
  }
}
