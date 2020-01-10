import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import Toaster from 'v-toaster'
import BootstrapVue from "bootstrap-vue"
import './scss/main.scss';

import App from './App.vue'
import { router } from './_helpers'
import { Interceptor } from './core'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faUserSecret, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store/'

library.add(faCoffee, faUserSecret, faPowerOff)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

Vue.use(VeeValidate, {
  fieldsBagName: 'veeFields'
});
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Toaster, { timeout: 5000 })

Interceptor.request();
Interceptor.response();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
