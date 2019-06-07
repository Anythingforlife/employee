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
              >
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
              >
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
import { authenticationService, storageService } from "../_services";
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
  created() {
    // work as onInit
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      authenticationService.login(this.user).then(
        response => {
          storageService.storeData("user", response);
          this.$router.push({ path: "/home" });
        },
        error => {
          this.$toaster.error(error.message);
        }
      );
    }
  },
  computed: {
    isValidForm() {
      return isValidForm(this.fields);
    },
    emailControlDirtyStatus() {
      return formControlDirtyStatus(this.fields, "username");
    },
    passwordControlDirtyStatus() {
      return formControlDirtyStatus(this.fields, "username");
    }
  },
  beforeDestroy() {}
};
</script>

