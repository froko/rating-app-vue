<script setup lang="ts">
import { Product } from './ProductModel';
import { ProductRatingEventArgs } from './RatingAppModel';
import RatingContainer from './RatingContainer.vue';

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  (e: 'productRatingChagne', args: ProductRatingEventArgs): void;
}>();

const handleRatingContainerChange = (eventArgs: ProductRatingEventArgs) => {
  emit('productRatingChagne', eventArgs);
};
</script>

<template>
  <div :id="props.product.id" class="product-satisfaction">
    <a :href="props.product.url">{{ props.product.title }}</a>
    <span>{{ props.product.description }}</span>
    <RatingContainer
      :product-id="props.product.id"
      :rating="props.product.rating"
      clickable
      @product-rating-change="handleRatingContainerChange"
    />
  </div>
</template>

<style>
.product-satisfaction {
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: column;
}

a {
  font-size: 1.5rem;
  display: block;
  color: var(--indigo900);
  font-weight: bold;
  text-decoration: none;
}

.product-satisfaction span {
  flex-grow: 1;
}

@media screen and (min-width: 1024px) {
  .product-satisfaction {
    padding: 2rem;
  }

  a {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
}
</style>
