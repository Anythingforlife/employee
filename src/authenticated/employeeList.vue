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
import { employeeService } from "../_services/employeeService";
export default {
  name: "EmplpoyeeList",
  data() {
    return {
      currentPage: 1,
      limit: 10,
      perPage: 10,
      total: 0,
      employees: [],
      columns: [
        {
          key: "id",
          label: "Id",
          sortable: true
        },
        {
          key: "employee_name",
          label: "Name",
          sortable: false
        },
        {
          key: "employee_salary",
          label: "Salary",
          sortable: true
        },
        {
          key: "employee_age",
          label: "Age",
          sortable: true
        },
        {
          key: "profile_image",
          label: "Profile image"
        }
      ]
    };
  },
  created() {
    this.employeesData();
  },
  methods: {
    addNewEmployee() {},

    employeesData() {
      employeeService
        .employeesData({ currentPage: this.currentPage, perPage: this.perPage })
        .then(
          response => {
            this.employees = response.data;
            this.total = response.total;
          },
          error => {
            this.$toaster.error(error.message);
          }
        );
    },
    pageChange(page) {
      this.currentPage = page;
      this.employeesData();
    }
  },
  computed: {
    rows() {
      return this.employees.length;
    }
  }
};
</script>