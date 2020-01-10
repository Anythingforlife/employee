import { storageService, authenticationService } from "../_services";
import { STORE_TYPE, CONSTANT } from "../_helpers/constant";
import { router } from '../_helpers';

const state = {
  user: storageService.getData(CONSTANT.USER)
}

const getters = {
  profile(currentState) {
    return currentState.user;
  }
}

const mutations = {
  profile(currentState, payload) {
    currentState.user = payload;
    storageService.storeData(CONSTANT.USER, payload);
  },
  logout(currentState) {
    currentState.user = null;
    storageService.removeData(CONSTANT.USER);
    router.push({ path: CONSTANT.URL_LOGIN });
  }
}

const actions = {
  async [STORE_TYPE.LOGIN]({ dispatch, commit }, payload) {
    try {
      const response = await authenticationService.login(payload);
      commit(STORE_TYPE.PROFILE, response);
      router.push({ path: CONSTANT.URL_HOME });
    } catch (error) {
      dispatch(STORE_TYPE.TOASTER_ERROR, error.message, { root: true });
    }
  },
  [STORE_TYPE.REGISTER]({ dispatch }, payload) {
    authenticationService.register(payload).then(response => {
      dispatch(STORE_TYPE.TOASTER_SUCCESS, response.message, { root: true });
      router.push({ path: CONSTANT.URL_LOGIN });
    }, error => {
      dispatch(STORE_TYPE.TOASTER_ERROR, error.message, { root: true });
    });
  },
  logout({ commit }) {
    commit(STORE_TYPE.LOGOUT);
  }
}

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
};