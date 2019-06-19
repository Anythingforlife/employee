<template>
  <div class="custom-loader" v-show="showLoader">
    <b-spinner
      variant="danger"
      style="width: 4rem; height: 4rem; margin:auto"
      label="Large Spinner"
    ></b-spinner>
  </div>
</template>
<script>
import { sharedSerivce } from "../../_services/sharedService";
import { Subscription } from "rxjs";
export default {
  name: "LoaderPage",
  data() {
    return {
      showLoader: false,
      subscription$: new Subscription()
    };
  },
  created() {
    this.toggleLoader();
  },
  methods: {
    toggleLoader() {
      this.subscription$ = sharedSerivce.toggleLoader.subscribe(
        showLoader => {
          this.showLoader = showLoader;
        },
        error => {
          this.showLoader = false;
        }
      );
    }
  },
  beforeDestroy() {
    this.subscription$.unsubscibe();
  }
};
</script>

<style>
.custom-loader {
  height: 100%;
  position: absolute;
  width: 100%;
  align-content: center;
  text-align: center;
  display: flex;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
}
</style>
