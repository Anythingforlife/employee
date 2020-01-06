import Vue from 'vue'
import Vuex from 'vuex'

import toaster from './toaster.module';
import common from './common.module';
import login from './login.module';
import employees from './employees.module';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    toaster,
    common,
    login,
    employees
  }
});
