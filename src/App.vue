<template>
  <div id="app">
    <div id="nav"></div>
    <LoaderPage/>
    <router-view/>
  </div>
</template>

<script>
import LoaderPage from "./shared/components/loader";
export default {
  name: "App",
  components: {
    LoaderPage
  }
};
</script>
