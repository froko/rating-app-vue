<script setup lang="ts">
import RatingContainer from './RatingContainer.vue';

const props = defineProps<{
  rating: number;
}>();
</script>

<template>
  <div id="overall-satisfaction" class="overall-satisfaction">
    <h2>Overall Satisfaction</h2>
    <span></span>
    <RatingContainer product-id="overall-satisfaction" :rating="props.rating" :clickable="false" />
  </div>
</template>

<style>
.overall-satisfaction {
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: column;
  background-color: var(--indigo900);
  color: var(--indigo50);
}

.overall-satisfaction h2 {
  font-size: 1.5rem;
  margin: 0;
  margin-bottom: 1rem;
}

.overall-satisfaction span {
  flex-grow: 1;
}

@media screen and (min-width: 1024px) {
  .overall-satisfaction {
    padding: 2rem;
  }

  .overall-satisfaction h2 {
    font-size: 1.8rem;
  }
}
</style>
