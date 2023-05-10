<template>
  <div class="product-container unvailable-container">
    <div class="content">
      <p>This product is unvailable to show</p>
      <button @click="fetchData">Next product</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async fetchData() {
      this.$store.dispatch("SET_LOADING");
      this.$store.dispatch("SET_NEW_INDEX");

      const data = await fetch(
        `https://fakestoreapi.com/products/${this.$store.state.index}`
      );

      const result = await data.json();

      this.$store.dispatch("NEW_DATA_PRODUCT", result);
      this.$store.dispatch("SET_LOADING");
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/unvailableProduct.css";
</style>
