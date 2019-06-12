<template>
  <div>
    <b-alert variant="secondary" show>
      <div class="text-right mr-2">
        <span class="mr-2">{{user ? user.email: ''}}</span>
        <b-button variant="danger" @click="logout" v-b-tooltip.hover title="Logout">
          <font-awesome-icon icon="power-off"/>
        </b-button>
      </div>
    </b-alert>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { STORE_TYPE, STORE_MODULE } from "../../_helpers/constant";
export default {
  name: "HeaderPage",
  data() {
    return {};
  },
  methods: {
    ...mapActions(STORE_MODULE.LOGIN, [STORE_TYPE.LOGOUT])
  },
  computed: {
    ...mapGetters(STORE_MODULE.LOGIN, {
      user: STORE_TYPE.PROFILE
    })
  }
};
</script>
