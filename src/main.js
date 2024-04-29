import Vue from 'vue'
import App from './App.vue'
import router from './router/router'

Vue.config.productionTip = false

console.log("环境变量->",process.env.VUE_APP_BASE_API)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
