const state = {
  type: null,
  message: null
};

const actions = {
  success({ commit }, payload) {
    commit('message', { message: payload, type: 'success' });
  },
  error({ commit }, payload) {
    commit('message', { message: payload, type: 'error' });
  },
  info({ commit }, payload) {
    commit('message', { message: payload, type: 'info' });
  },
  warning({ commit }, payload) {
    commit('message', { message: payload, type: 'warning' });
  },
  clear({ commit }, message) {
    commit('clear', message);
  }
};

const mutations = {
  message(currentState, payload) {
    currentState.type = payload.type;
    currentState.message = payload.message;
  },
  clear(currentState) {
    currentState.type = null;
    currentState.message = null;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
