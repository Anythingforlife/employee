import { employeeService } from "../_services/employeeService";
import { STORE_TYPE } from "../_helpers/constant";

const state = {
  total: 0,
  currentPage: 1,
  employees: {},
  currentPageData: [],
  employee: {}
}


const getters = {
  allPaginationsData(state) {
    return state.employees[state.currentPage];
  },
  currentPageData(state) {
    return state.currentPageData;
  },
  total(state) {
    return state.total;
  },
  errorMesssage(state) {
    return state.errorMesssage;
  }
}


const mutations = {
  allPaginationsData(state, payload) {
    state.employees[payload.currentPage] = payload.data;
  },
  currentPage(state, payload) {
    state.currentPage = payload.currentPage;
  },
  total(state, payload) {
    state.total = payload;
  },
  currentPageData(state, payload) {
    if (payload.currentPage) {
      state.currentPageData = state.employees[payload.currentPage]
      return;
    }
    state.currentPageData = payload.data;
  },
  errorMesssage(state, payload) {
    state.errorMesssage = payload;
  }
}


const actions = {
  loadCurrentPageData({ dispatch, commit }, payload) {
    commit(STORE_TYPE.CURRENT_PAGE, payload.currentPage);
    if (!state.employees[payload.currentPage]) {
      employeeService.employeesData({ currentPage: payload.currentPage, perPage: payload.perPage })
        .then(response => {
          commit(STORE_TYPE.ALL_PAGINATION_DATA, { data: response.data, currentPage: payload.currentPage });
          commit(STORE_TYPE.CURRENT_PAGE_DATA, { data: response.data });
          commit(STORE_TYPE.TOTAL, response.total);
        }, error => {
          dispatch(STORE_TYPE.TOASTER_ERROR, error.message, { root: true });
        });
    } else {
      commit(STORE_TYPE.CURRENT_PAGE_DATA, { currentPage: payload.currentPage });
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};