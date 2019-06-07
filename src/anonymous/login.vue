<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 offset-sm-3">
          <h2>Login</h2>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                v-model="username"
                name="username"
                v-validate="'required'"
                id="username"
                class="form-control"
                :class="{ 'is-invalid': usernameControlDirtyStatus &&  errors.has('username') }"
              >
              <div v-show="usernameControlDirtyStatus" class="invalid-feedback">
                <span v-show="errors.has('username')">{{ errors.first('username') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                v-model="password"
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
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  created() {
    // work as onInit
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      console.log("login");
    }
  },
  computed: {
    isValidForm() {
      return isValidForm(this.fields);
    },
    usernameControlDirtyStatus() {
      return formControlDirtyStatus(this.fields, "username");
    },
    passwordControlDirtyStatus() {
      return formControlDirtyStatus(this.fields, "username");
    }
  }
};
</script>

