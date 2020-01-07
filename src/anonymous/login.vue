<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 offset-sm-3">
          <h2>Login</h2>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="text"
                v-model="user.email"
                name="email"
                v-validate="'required'"
                id="email"
                class="form-control"
                :class="{ 'is-invalid': emailControlDirtyStatus &&  errors.has('email') }"
              />
              <div v-show="emailControlDirtyStatus" class="invalid-feedback">
                <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                v-model="user.password"
                name="password"
                v-validate="'required'"
                class="form-control"
                :class="{ 'is-invalid': passwordControlDirtyStatus && errors.has('password') }"
              />
              <div v-show="passwordControlDirtyStatus" class="invalid-feedback">
                <span v-show="errors.has('password')">{{ errors.first('password') }}</span>
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary" :disabled="isValidForm">Login</button>
              <router-link to="/register" class="btn btn-link">Register</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  isValidForm,
  formControlDirtyStatus
} from "../_helpers/formValidation";
import { mapActions } from "vuex";
import { STORE_MODULE, STORE_TYPE, CONSTANT } from "../_helpers/constant";
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(STORE_MODULE.LOGIN, [STORE_TYPE.LOGIN]),
    handleSubmit() {
      this[STORE_TYPE.LOGIN](this.user);
    }
  },
  computed: {
    isValidForm() {
      return isValidForm(this.veeFields);
    },
    emailControlDirtyStatus() {
      return formControlDirtyStatus(this.veeFields, CONSTANT.EMAIL);
    },
    passwordControlDirtyStatus() {
      return formControlDirtyStatus(this.veeFields, CONSTANT.PASSWORD);
    }
  }
};
</script>