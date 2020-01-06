<template>
  <h1 :style="headingStyles">{{title}} {{sum(2,3)}}</h1>
</template>

<script>
export default {
  name: "Sample",
  data() {
    return {
      headingStyles: {
        color: this.color
      }
    };
  },
  props: ["title", "color"],
  methods: {
    sum(a, b) {
      return a + b;
    }
  }
};
</script>
