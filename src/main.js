import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import routes from './routes'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.xhr = { withCredentials : true }

const router = new VueRouter({routes, mode:'history'})

new Vue({
  vuetify,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
