<template>
  <div id="app">
    <!-- <div id="nav"></div>
    <LoaderPage/>
    <router-view/>-->
    <Sample />
  </div>
</template>

<script>
import LoaderPage from "./shared/components/loader";
import Sample from "@/components/sample.vue";
import { STORE_MODULE, STORE_TYPE } from "./_helpers/constant";
import { mapState, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    LoaderPage,
    Sample
  },
  computed: {
    ...mapState(STORE_MODULE.TOASTER, [STORE_TYPE.MESSAGE, STORE_TYPE.TYPE])
  },
  methods: {
    ...mapActions(STORE_MODULE.TOASTER, [STORE_TYPE.CLEAR])
  },
  watch: {
    message(newValue) {
      if (newValue) {
        this.$toaster[this.type](newValue);
        this[STORE_TYPE.CLEAR]();
      }
    }
  }
};
</script>
