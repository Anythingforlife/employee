const state = {
  isLoading: false,
  message: ''
}

const mutations = {
  showHideLoader(state, payload) {
    state.isLoading = payload;
  }
}

const actions = {
  showHideLoader({ commit }, payload) {
    commit('showHideLoader', payload);
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
};