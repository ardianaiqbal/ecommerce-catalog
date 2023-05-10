<template>
  <div class="product-container">
    <div class="product-image">
      <img :src="$store.state.productData.image" alt="product-image" />
    </div>
    <div class="product-description">
      <h2
        :class="{
          'women-text': $store.state.productData?.category?.includes('women'),
          'man-text': !$store.state.productData?.category?.includes('women'),
        }"
      >
        {{ $store.state.productData.title }}
      </h2>
      <div class="gender-and-rate-wrapper">
        <p>{{ $store.state.productData.category }}</p>
        <div class="rate-content">
          <p>{{ $store.state.productData?.rating?.rate }}/5</p>
          <span
            v-for="value in maxRate"
            :key="value"
            class="circle"
            :class="{
              'man-circle':
                value < $store.state.productData?.rating?.rate &&
                !$store.state.productData?.category?.includes('women'),
              'women-circle':
                value < $store.state.productData?.rating?.rate &&
                $store.state.productData?.category?.includes('women'),
            }"
          ></span>
        </div>
      </div>
      <div class="horizontal-line"></div>
      <p class="content-description">
        {{ $store.state.productData.description }}
      </p>
      <div class="horizontal-line"></div>
      <h3
        :class="{
          'women-text': $store.state.productData?.category?.includes('women'),
          'man-text': !$store.state.productData?.category?.includes('women'),
        }"
      >
        ${{ $store.state.productData.price }}
      </h3>
      <div class="buttons-container">
        <button
          class="buy-button"
          :class="{
            'women-buy-button':
              $store.state.productData?.category.includes('women'),
            'man-buy-button':
              !$store.state.productData?.category.includes('women'),
          }"
        >
          Buy now
        </button>
        <button
          class="next-button"
          :class="{
            'women-text': $store.state.productData?.category.includes('women'),
            'women-border-next-button':
              $store.state.productData?.category.includes('women'),
            'man-text': !$store.state.productData?.category.includes('women'),
            'man-border-next-button':
              !$store.state.productData?.category.includes('women'),
          }"
          @click="fetchData"
        >
          Next product
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maxRate: [1, 2, 3, 4, 5],
    };
  },
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
@import "../assets/styles/productDisplay.css";
</style>
