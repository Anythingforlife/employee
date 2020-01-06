<template>
  <div class="col-sm-6 offset-sm-3">
    <h2>Add Employee</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Name</label>
        <input
          type="text"
          v-model="employee.employee_name"
          name="employee_name"
          v-validate="'required'"
          id="employee_name"
          class="form-control"
          :class="{ 'is-invalid': employeeNameControlDirtyStatus &&  errors.has(CONSTANT.EMPLOYEE_NAME) }"
        >
        <div v-show="employeeNameControlDirtyStatus" class="invalid-feedback">
          <span
            v-show="errors.has(CONSTANT.EMPLOYEE_NAME)"
          >{{ errors.first(CONSTANT.EMPLOYEE_NAME) }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Age</label>
        <input
          type="text"
          v-model="employee.employee_age"
          name="employee_age"
          v-validate="'required'"
          id="employee_age"
          class="form-control"
          :class="{ 'is-invalid': employeeAgeControlDirtyStatus &&  errors.has(CONSTANT.EMPLOYEE_AGE) }"
        >
        <div v-show="employeeAgeControlDirtyStatus" class="invalid-feedback">
          <span v-show="errors.has(CONSTANT.EMPLOYEE_AGE)">{{ errors.first(CONSTANT.EMPLOYEE_AGE) }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="password">Salary</label>
        <input
          type="text"
          v-model="employee.employee_salary"
          name="employee_salary"
          v-validate="'required'"
          class="form-control"
          :class="{ 'is-invalid': employeeSalaryControlDirtyStatus && errors.has(CONSTANT.EMPLOYEE_SALARY) }"
        >
        <div v-show="employeeSalaryControlDirtyStatus" class="invalid-feedback">
          <span
            v-show="errors.has(CONSTANT.EMPLOYEE_SALARY)"
          >{{ errors.first(CONSTANT.EMPLOYEE_SALARY) }}</span>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="isValidForm">Submit</button>
        <router-link to="/" class="btn btn-link">Cancle</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import {
  isValidForm,
  formControlDirtyStatus
} from "../_helpers/formValidation";
import { mapActions, mapGetters } from "vuex";
import { STORE_MODULE, STORE_TYPE, CONSTANT } from "../_helpers/constant";
export default {
  name: "AddUpdateEmployee",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      CONSTANT: CONSTANT,
      employeeId: null
    };
  },
  created() {
    this[STORE_TYPE.SET_CURRENT_URL](CONSTANT.URL_EMPLOYEE);
    if (this.$route.params.id) {
      this.employeeId = this.$route.params.id;
    }
  },
  methods: {
    ...mapActions(STORE_MODULE.EMPLOYEES, [
      STORE_TYPE.ADD_EMPLOYEE,
      STORE_TYPE.SET_CURRENT_URL,
      STORE_TYPE.EDIT_EMPLOYEE
    ]),
    handleSubmit() {
      if (this.employeeId) {
        this[STORE_TYPE.EDIT_EMPLOYEE]({
          employeeId: this.employeeId,
          employee: this.employee
        });
        return;
      }
      this[STORE_TYPE.ADD_EMPLOYEE](this.employee);
    }
  },
  computed: {
    ...mapGetters(STORE_MODULE.EMPLOYEES, [STORE_TYPE.EMPLOYEE]),
    isValidForm() {
      return isValidForm(this.veeFields);
    },
    employeeNameControlDirtyStatus() {
      return formControlDirtyStatus(this.veeFields, CONSTANT.EMPLOYEE_NAME);
    },
    employeeAgeControlDirtyStatus() {
      return formControlDirtyStatus(this.veeFields, CONSTANT.EMPLOYEE_AGE);
    },
    employeeSalaryControlDirtyStatus() {
      return formControlDirtyStatus(this.veeFields, CONSTANT.EMPLOYEE_SALARY);
    }
  },
  beforeDestroy() {
    this[STORE_TYPE.SET_CURRENT_URL](CONSTANT.URL_BLANK);
  }
};
</script>