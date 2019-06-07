<template>
  <div>
    <HeaderPage/>
    <EmplpoyeeList/>
  </div>
</template>

<script>
import EmplpoyeeList from "./employeeList";
import HeaderPage from "../shared/components/header";
export default {
  name: "Home",
  components: {
    EmplpoyeeList,
    HeaderPage
  },
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>

