import { employeeService, sharedService } from "../_services/";
import { STORE_TYPE, CONSTANT } from "../_helpers/constant";
import { router } from '../_helpers';
import { employee } from '../_models/employee'

const state = {
  total: 0,
  currentPage: 1,
  employees: {},
  currentPageData: [],
  employee: sharedService.cloneObject(employee),
  currentUrl: '/',
  isResetState: false
}


const getters = {
  [STORE_TYPE.EMPLOYEE](currentState) {
    return currentState.employee;
  },
  allPaginationData(currentState) {
    return currentState.employees[currentState.currentPage];
  },
  currentPageData(currentState) {
    return currentState.currentPageData;
  },
  total(currentState) {
    return currentState.total;
  },
  errorMessage(currentState) {
    return currentState.errorMessage;
  }
}

const mutations = {
  [STORE_TYPE.UPDATE_CURRENT_PAGE_DATA](currentState, payload) {
    const index = currentState.currentPageData.findIndex(data => {
      return data.id === payload.employeeId;
    });
    currentState.employees[currentState.currentPage][index] = payload.employee;
    currentState.currentPageData = currentState.employees[currentState.currentPage];
  },
  [STORE_TYPE.EMPLOYEE](currentState, payload) {
    currentState.employee = sharedService.cloneObject(payload ? payload : employee);
  },
  [STORE_TYPE.CURRENT_URL](currentState, payload) {
    currentState.currentUrl = payload;
  },
  [STORE_TYPE.IS_RESET_STATE](currentState, payload) {
    currentState.isResetState = payload;
  },
  [STORE_TYPE.CLEAR](currentState) {
    currentState.employees = {};
    currentState.employee = sharedService.cloneObject(employee)
    currentState.total = 0
    currentState.currentPage = 1;
    currentState.currentPageData = [];
  },
  allPaginationData(currentState, payload) {
    currentState.employees[payload.currentPage] = payload.data;
  },
  [STORE_TYPE.CURRENT_PAGE](currentState, payload) {
    currentState.currentPage = payload;
  },
  total(currentState, payload) {
    currentState.total = payload;
  },
  currentPageData(currentState, payload) {
    if (payload.currentPage) {
      currentState.currentPageData = currentState.employees[payload.currentPage]
      return;
    }
    currentState.currentPageData = payload.data;
  },
  errorMessage(currentState, payload) {
    currentState.errorMessage = payload;
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
  [STORE_TYPE.SET_IS_RESET_STATE]({ commit }, payload) {
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