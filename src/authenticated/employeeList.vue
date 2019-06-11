<template>
  <div class="container">
    <div class="row">
      <div class="text-right mb-2">
        <b-button
          variant="primary"
          @click="addNewEmployee"
          v-b-tooltip.hover
          title="Add new employee"
        >Add new</b-button>
      </div>
      <b-table striped hover :items="employees" :fields="columns"></b-table>

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
  </div>
</template>

<script>
import { columns } from "../_models/employee";
import { STORE_MODULE, STORE_TYPE } from "../_helpers/constant";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EmplpoyeeList",
  data() {
    return {
      currentPage: 1,
      limit: 10,
      perPage: 10,
      columns: columns
    };
  },
  created() {
    this[STORE_TYPE.LOAD_CURRENT_PAGE_DATA]({
      currentPage: this.currentPage,
      perPage: this.perPage
    });
  },
  computed: {
    ...mapGetters(STORE_MODULE.EMPLOYEES, {
      employees: STORE_TYPE.CURRENT_PAGE_DATA,
      total: STORE_TYPE.TOTAL
    })
  },
  methods: {
    ...mapActions(STORE_MODULE.EMPLOYEES, [STORE_TYPE.LOAD_CURRENT_PAGE_DATA]),
    addNewEmployee() {},
    pageChange(page) {
      this.currentPage = page;
      this[STORE_TYPE.LOAD_CURRENT_PAGE_DATA]({
        currentPage: this.currentPage,
        perPage: this.perPage
      });
    }
  }
};
</script>