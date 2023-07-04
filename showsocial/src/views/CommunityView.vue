<template>
  <div class="posts"> 
    <ShowPost v-for="post in postStore.community" :post="post" :key="post.id"/>
  </div>
</template>

<script>
import ShowPost from '../components/ShowPost.vue';
import { usePostStore } from '../stores/posts';

export default {
  components: { ShowPost },
  setup() {
    const postStore = usePostStore();
    return { postStore };
  },
}
</script>

<style scoped>
  .posts {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }
</style>