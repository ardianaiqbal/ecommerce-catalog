<script setup>
import ProductDisplay from "./components/ProductDisplay.vue";
import UnvailableProduct from "./components/UnvailableProduct.vue";
import Loader from "./components/Loader.vue";
</script>

<template>
  <section
    v-if="$store.state.loading"
    class="main-wrapper unvailable-background"
  >
    <Loader />
  </section>
  <section
    v-else
    class="main-wrapper"
    :class="{
      'women-background': $store.state.productData?.category?.includes('women'),
      'man-background': $store.state.productData?.category?.includes('men'),
      'unvailable-background':
        !$store.state.productData?.category?.includes('men'),
    }"
  >
    <div v-if="$store.state.productData?.category?.includes('men')">
      <ProductDisplay />
    </div>
    <div v-else>
      <UnvailableProduct />
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("SET_LOADING");

    fetch(`https://fakestoreapi.com/products/1`)
      .then((res) => res.json())
      .then((data) => {
        this.$store.dispatch("NEW_DATA_PRODUCT", data);
        this.$store.dispatch("SET_LOADING");
      })
      .catch((err) => console.error(err));
  },
};
</script>

<style scoped>
.man-background {
  background-image: url(./assets/image/bg-pattern.png),
    url(./assets/image/blue-bg.png);
  background-repeat: repeat-x;
  background-size: 1283px 548px;
}
.women-background {
  background-image: url(./assets/image/bg-pattern.png),
    url(./assets/image/pink-bg.png);
  background-repeat: repeat-x;
  background-size: 1283px 548px;
}
.unvailable-background {
  background-image: url(./assets/image/grey-bg.png);
  background-repeat: repeat-x;
  background-size: 1283px 548px;
}
</style>
