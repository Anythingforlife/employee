import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import Toaster from 'v-toaster'
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import 'v-toaster/dist/v-toaster.css'

import App from './App.vue'
import { router } from './_helpers'

Vue.config.productionTip = false;
Vue.config.apiURL = 'http://localhost:4000';

Vue.use(VeeValidate);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Toaster, { timeout: 5000 })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
