// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);


axios.defaults.baseURL = 'http://210.28.188.99:8088';
//axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.token;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.defaults.timeout = 6000;
// 添加请求拦截器
axios.interceptors.request.use(config => {
  let token = store.state.token;
  if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = 'Bearer ' + token;
    //console.log('interceptors config=',config)
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 这里写清除token的代码
          store.state.token = null;
          sessionStorage.clear();
          router.replace({
            path: '/',
            query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
          })
      }
    }
    return Promise.reject(error.response.data)
  });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
