import Vue from 'vue'
import App from './App.vue'
import router from './router/router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import request from '@/utils/request'
import storage from '@/utils/storage'
import store from '@/store'

import '@/assets/css/global.css'

Vue.prototype.$storage = storage
Vue.prototype.$request = request
Vue.prototype.$store = store

Vue.use(ElementUI)



Vue.config.productionTip = false

console.log("环境变量->", process.env.VUE_APP_BASE_API)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
