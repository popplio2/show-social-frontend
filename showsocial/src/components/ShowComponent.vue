<script setup>
import { useUserStore } from '../stores/user';
const userStore = useUserStore();
</script>

<template>
  <div class="show-wrapper">
    <p>{{ show.name }}</p>
    <img :src="show.image.original" alt="" v-if="show.image">
    <p v-else>(Image not available)</p>
    <button @click="userStore.addShow(show)" class="add-btn" v-if="isAddable">Add show</button>
    <button @click="$emit('post')" class="add-btn" v-else>Post show</button>
  </div>
</template>

<script>
export default {
  name: "ShowComponent",
  props: {
    show: Object,
    isAddable: Boolean,
  },
}
</script>

<style scoped>
   .show-wrapper {
    flex-basis: 20rem; /* Minimum width of 30rem */
    flex-grow: 1; /* Allow items to grow and fill up remaining space */
    max-width: calc(100% / 3); /* Divide the container into equal columns */
    
    display: flex;
    flex-direction: column;
    align-items: center;
    border: .1rem black solid;
    border-radius: 1rem;
    padding: 2rem;
    transition: .3s all;
  }
  .show-wrapper:hover {
    transform: scale(1.05);
  }
  img {
    object-fit: cover;
    height: 15rem;
    width: 90%;
  }
  button {
    margin-top: 2rem;
  }
  p {
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Media queries for responsive behavior */
@media screen and (max-width: 1200px) {
  .show-wrapper {
    max-width: calc(100% / 2); /* Two columns on smaller screens */
  }
}

@media screen and (max-width: 768px) {
  .show-wrapper {
    max-width: 100%; /* Single column on the smallest screens */
  }
}
</style>