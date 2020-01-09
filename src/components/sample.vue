<template>
<div>
  <h1 :style="headingStyles">{{title}} {{sum(2,3)}}</h1>
  <button>test</button>
  </div>
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
