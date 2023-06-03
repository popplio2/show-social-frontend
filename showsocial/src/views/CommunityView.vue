<template>
  <div v-for="post in postStore.community" :key="post.name">
    <!-- Figure out way to keep track of posts--an id property?? for the entire app not just per user?? -->
    <h1>{{ post.showName }}</h1>
    <h2>{{ post.postID }}</h2>
    <img :src="post.showImage" alt="">
    <p>{{ post.text }}</p>
  </div>
</template>

<script>
import { usePostStore } from '../stores/posts';

export default {
  setup() {
    const postStore = usePostStore();
    return { postStore };
  },
}
</script>

<style>

</style>