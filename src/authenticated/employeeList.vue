<template>
  <div class="container">
    <div class="row" v-show="$route.path===CONSTANT.URL_BLANK">
      <div class="text-right mb-2">
        <b-button
          variant="primary"
          @click="addNewEmployee"
          v-b-tooltip.hover
          title="Add new employee"
        >Add new</b-button>
      </div>
      <b-table striped hover :items="employees" :fields="columns">
        <template slot="actions" slot-scope="row">
          <b-button variant="info" size="sm" @click="editEmployee(row.item)" class="mr-1">Edit</b-button>
          <b-button variant="danger" size="sm" @click="deleteEmployee(row.item.id)">Delete</b-button>
        </template>
      </b-table>

      <div class="center">
        <b-pagination
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          :limit="limit"
          aria-controls="my-table"
          @change="pageChange"
        ></b-pagination>
      </div>
    </div>
    <div class="row">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { columns } from "../_models/employee";
import { STORE_MODULE, STORE_TYPE, CONSTANT } from "../_helpers/constant";
import { mapActions, mapGetters, mapState } from "vuex";
import { COPYFILE_EXCL } from "constants";
export default {
  name: "EmplpoyeeList",
  data() {
    return {
      currentPage: 1,
      limit: 10,
      perPage: 10,
      columns: columns,
      CONSTANT: CONSTANT,
      STORE_TYPE: STORE_TYPE
    };
  },
  created() {
    this[STORE_TYPE.LOAD_CURRENT_PAGE_DATA]({
      currentPage: this.currentPage,
      perPage: this.perPage
    });
  },
  computed: {
    ...mapState(STORE_MODULE.EMPLOYEES, [
      STORE_TYPE.CURRENT_URL,
      STORE_TYPE.IS_RESET_STATE
    ]),
    ...mapGetters(STORE_MODULE.EMPLOYEES, {
      employees: STORE_TYPE.CURRENT_PAGE_DATA,
      total: STORE_TYPE.TOTAL
    })
  },
  methods: {
    ...mapActions(STORE_MODULE.EMPLOYEES, [
      STORE_TYPE.LOAD_CURRENT_PAGE_DATA,
      STORE_TYPE.SET_IS_RESTE_STATE,
      STORE_TYPE.SELECTED_EMPLOYEE,
      STORE_TYPE.DELETE_EMPLOYEE
    ]),
    addNewEmployee() {
      this[STORE_TYPE.SELECTED_EMPLOYEE](null);
      this.$router.push(CONSTANT.URL_ADD_EMPLOYEE);
    },
    editEmployee(employee) {
      this[STORE_TYPE.SELECTED_EMPLOYEE](employee);
      this.$router.push(CONSTANT.URL_EMPLOYEE + "/" + employee.id);
    },
    pageChange(page) {
      this.currentPage = page;
      this[STORE_TYPE.LOAD_CURRENT_PAGE_DATA]({
        currentPage: this.currentPage,
        perPage: this.perPage
      });
    }
  },
  watch: {
    isResetState(newValue) {
      if (this[STORE_TYPE.IS_RESET_STATE]) {
        this[STORE_TYPE.SET_IS_RESTE_STATE](false);
        this.pageChange(1);
      }
    }
  }
};
</script>