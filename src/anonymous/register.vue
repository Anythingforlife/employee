<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 offset-sm-3">
          <h2>Register</h2>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                type="text"
                v-model="user.firstName"
                v-validate="{ required: true , regex:PATTERNS.firstName}"
                name="firstName"
                class="form-control"
                :class="{ 'is-invalid': firstNameControlDirtyStatus &&  errors.has('firstName')  }"
              >
              <div v-show="firstNameControlDirtyStatus" class="invalid-feedback">
                <span v-show="errors.has('firstName')">{{ errors.first('firstName') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                v-model="user.lastName"
                v-validate="'required'"
                name="lastName"
                class="form-control"
                :class="{ 'is-invalid':lastNameControlDirtyStatus &&  errors.has('lastName') }"
              >
              <div v-show="lastNameControlDirtyStatus" class="invalid-feedback">
                <span v-show="errors.has('lastName')">{{ errors.first('lastName') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="lastName">Email</label>
              <input
                type="text"
                v-model="user.email"
                v-validate="{ required: true , regex:PATTERNS.email}"
                name="email"
                class="form-control"
                :class="{ 'is-invalid':emailControlDirtyStatus &&  errors.has('email') }"
              >
              <div v-show="emailControlDirtyStatus" class="invalid-feedback">
                <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                v-model="user.username"
                v-validate="'required'"
                name="username"
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
                v-model="user.password"
                v-validate="{ required: true, min: 6 }"
                name="password"
                class="form-control"
                ref="password"
                :class="{ 'is-invalid': passwordControlDirtyStatus &&  errors.has('password')}"
              >
              <div v-show="passwordControlDirtyStatus" class="invalid-feedback">
                <span v-show="errors.has('password')">{{ errors.first('password') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm password</label>
              <input
                type="password"
                v-model="user.confirmPassword"
                v-validate="{ required: true, min: 6 ,confirmed: 'password' }"
                name="confirmPassword"
                class="form-control"
                :class="{ 'is-invalid': confirmPasswordControlDirtyStatus &&  errors.has('confirmPassword')}"
              >
              <div v-show="confirmPasswordControlDirtyStatus" class="invalid-feedback">
                <span v-show="errors.has('confirmPassword')">{{ errors.first('confirmPassword') }}</span>
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary" :disabled="isValidForm">Register</button>
              <router-link to="/login" class="btn btn-link">Cancle</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isValidForm, formControlDirtyStatus, PATTERNS } from "../_helpers";
import { mapActions } from "vuex";
import { STORE_MODULE, STORE_TYPE, CONSTANT } from "../_helpers/constant";

export default {
  name: "Register",
  data() {
    return {
      PATTERNS: {},
      user: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  created() {
    this.PATTERNS = PATTERNS;
  },
  methods: {
    handleSubmit() {
      this[STORE_TYPE.REGISTER](this.user);
    },
    ...mapActions(STORE_MODULE.LOGIN, [STORE_TYPE.REGISTER])
  },
  computed: {
    isValidForm() {
      return isValidForm(this.veeFields);
    },
    firstNameControlDirtyStatus() {
      return formControlDirtyStatus(this.veeFields, CONSTANT.FIRST_NAME);
    },
    lastNameControlDirtyStatus() {
      return formControlDirtyStatus(this.veeFields, CONSTANT.LAST_NAME);
    },
    emailControlDirtyStatus() {
      return formControlDirtyStatus(this.veeFields, CONSTANT.EMAIL);
    },
    usernameControlDirtyStatus() {
      return formControlDirtyStatus(this.veeFields, CONSTANT.USERNANE);
    },
    passwordControlDirtyStatus() {
      return formControlDirtyStatus(this.veeFields, CONSTANT.PASSWORD);
    },
    confirmPasswordControlDirtyStatus() {
      return formControlDirtyStatus(this.veeFields, CONSTANT.CONFIRM_PASSWORD);
    }
  }
};
</script>