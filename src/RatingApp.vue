<script setup lang="ts">
import { reactive, ref } from 'vue';

import OverallSatisfaction from './OverallSatisfaction.vue';
import { Product } from './ProductModel';
import ProductSatisfaction from './ProductSatisfaction.vue';
import { ProductRatingEventArgs } from './RatingAppModel';
const props = defineProps<{ products: Product[] }>();

const totalRating = (total: number, product: Product) => total + product.rating;
const averageRating = (products: Product[]): number => Math.floor(products.reduce(totalRating, 0) / products.length);

let products = reactive(props.products);
let overallRating = ref(averageRating(products));

const handleProductRatingChange = (e: ProductRatingEventArgs) => {
  const newProducts = [...products];
  const index = newProducts.findIndex((p) => p.id === e.productId);
  newProducts[index].rating = e.rating;

  products = newProducts;
  overallRating.value = averageRating(products);
};
</script>

<template>
  <h1>{{ products.map((p) => p.title).join(' - ') }}</h1>
  <div id="products" class="responsive-container">
    <ProductSatisfaction
      v-for="product in products"
      :key="product.id"
      :product="product"
      @product-rating-chagne="handleProductRatingChange"
    />
    <OverallSatisfaction :rating="overallRating" />
  </div>
</template>

<style>
h1 {
  margin-top: 3rem;
  text-align: center;
  font-size: 2rem;
  color: var(--indigo900);
}

.responsive-container {
  display: grid;
  grid-auto-flow: row;
  row-gap: 1rem;
  margin: 1rem;
}

@media screen and (min-width: 1024px) {
  h1 {
    font-size: 3rem;
  }

  .responsive-container {
    grid-auto-flow: column;
    column-gap: 1rem;
  }
}
</style>
