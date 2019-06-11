import Vue from 'vue'
import Vuex from 'vuex'

import toaster from './toaster.module';
import comman from './comman.module';
import login from './login.module';
import employees from './employees.module';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    toaster,
    comman,
    login,
    employees
  }
});
