<template>
  <div>
    <b-alert variant="secondary" show>
      <div class="text-right mr-2">
        <span class="mr-2">{{user.email}}</span>
        <b-button variant="danger" @click="logout" v-b-tooltip.hover title="Logout">
          <font-awesome-icon icon="power-off"/>
        </b-button>
      </div>
    </b-alert>
  </div>
</template>
<script>
import { authenticationService, storageService } from "../../_services";
export default {
  name: "HeaderPage",
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.usersProlfile();
  },
  methods: {
    logout() {
      authenticationService.logout();
      this.$router.push("/login");
    },
    usersProlfile() {
      this.user = storageService.getData("user");
    }
  }
};
</script>
