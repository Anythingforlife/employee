import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate';
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import { router } from './_helpers'

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(VueRouter);
Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
