import Vue from 'vue'
import App from './App.vue'
// 路由
import router from './router'
// elementUI插件
import ElementUI, { MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// vuex
import store from '../src/store/index.js'
// axios
import http from 'axios'
import '../api/mock.js'

Vue.config.productionTip = false
Vue.use(ElementUI);
//axios 不属于插件所以绑定在vue的prototype
Vue.prototype.$http = http
// Vue.prototype.$confirm = MessageBox.confirm

// 导航守卫
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  }
  else if (token && to.name === 'login') {
    next({ name: 'home' })
  }
  else {
    next()
  }
})


new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit("addMenu", this.$router);
  }
}).$mount('#app')
