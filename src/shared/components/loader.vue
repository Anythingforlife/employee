<template>
  <div class="text-center" v-show="showLoader">
    <b-spinner
      variant="danger"
      style="width: 4rem; height: 4rem; margin:auto"
      label="Large Spinner"
    ></b-spinner>
    <!-- type="grow" -->
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
          this.showLoader = error;
        }
      );
    }
  },
  beforeDestroy() {
    this.subscription$.unsubscibe();
  }
};
</script>