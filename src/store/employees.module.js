import { employeeService, sharedSerivce } from "../_services/";
import { STORE_TYPE, CONSTANT } from "../_helpers/constant";
import { router } from '../_helpers';
import { employee } from '../_models/employee'

const state = {
  total: 0,
  currentPage: 1,
  employees: {},
  currentPageData: [],
  employee: sharedSerivce.cloneObject(employee),
  currentUrl: '/',
  isResetState: false
}


const getters = {
  [STORE_TYPE.EMPLOYEE](state) {
    return state.employee;
  },
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
  [STORE_TYPE.UPDATE_CURRENT_PAGE_DATA](state, payload) {
    const index = state.currentPageData.findIndex(data => {
      return data.id === payload.employeeId;
    });
    state.employees[state.currentPage][index] = payload.employee;
    state.currentPageData = state.employees[state.currentPage];
  },
  [STORE_TYPE.EMPLOYEE](state, payload) {
    state.employee = sharedSerivce.cloneObject(payload ? payload : employee);
  },
  [STORE_TYPE.CURRENT_URL](state, payload) {
    state.currentUrl = payload;
  },
  [STORE_TYPE.IS_RESET_STATE](state, payload) {
    state.isResetState = payload;
  },
  [STORE_TYPE.CLEAR](state) {
    state.employees = {};
    state.employee = sharedSerivce.cloneObject(employee)
    state.total = 0
    state.currentPage = 1;
    state.currentPageData = [];
  },
  allPaginationsData(state, payload) {
    state.employees[payload.currentPage] = payload.data;
  },
  [STORE_TYPE.CURRENT_PAGE](state, payload) {
    state.currentPage = payload;
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
  [STORE_TYPE.DELETE_EMPLOYEE]({ dispatch, commit }, payload) {
    employeeService.deleteEmployee(payload).then(response => {
      dispatch(STORE_TYPE.TOASTER_SUCCESS, response.message, { root: true });
      commit(STORE_TYPE.CLEAR);
      commit(STORE_TYPE.IS_RESET_STATE, true);
      router.push({ path: CONSTANT.URL_BLANK });
    }, error => {
      dispatch(STORE_TYPE.TOASTER_ERROR, error.message, { root: true });
    });
  },
  [STORE_TYPE.SELECTED_EMPLOYEE]({ commit }, payload) {
    commit(STORE_TYPE.EMPLOYEE, payload);
  },
  [STORE_TYPE.SET_CURRENT_URL]({ commit }, payload) {
    commit(STORE_TYPE.CURRENT_URL, payload);
  },
  [STORE_TYPE.SET_IS_RESTE_STATE]({ commit }, payload) {
    commit(STORE_TYPE.IS_RESET_STATE, payload);
  },
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
  },
  [STORE_TYPE.ADD_EMPLOYEE]({ dispatch, commit }, payload) {
    employeeService.addEmployee(payload).then(response => {
      dispatch(STORE_TYPE.TOASTER_SUCCESS, response.message, { root: true });
      commit(STORE_TYPE.CLEAR);
      commit(STORE_TYPE.IS_RESET_STATE, true);
      router.push({ path: CONSTANT.URL_BLANK });
    }, error => {
      dispatch(STORE_TYPE.TOASTER_ERROR, error.message, { root: true });
    });
  },
  [STORE_TYPE.EDIT_EMPLOYEE]({ dispatch, commit }, payload) {
    employeeService.editEmployee(payload.employeeId, payload.employee).then(response => {
      dispatch(STORE_TYPE.TOASTER_SUCCESS, response.message, { root: true });
      commit(STORE_TYPE.UPDATE_CURRENT_PAGE_DATA, payload);
      router.push({ path: CONSTANT.URL_BLANK });
    }, error => {
      dispatch(STORE_TYPE.TOASTER_ERROR, error.message, { root: true });
    });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};