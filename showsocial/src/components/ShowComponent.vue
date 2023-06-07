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
    background-color: #fff;
    margin: 2rem;
    padding: 2rem;
  }
  img {
    object-fit: cover;
    width: 10rem;
    height: 15rem;
  }
</style>