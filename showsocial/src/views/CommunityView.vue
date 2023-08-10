<template>
  <div class="posts"> 
    <ShowPost v-for="post in postStore.community" :post="post" :key="post.id"/>
  </div>
</template>

<script>
import ShowPost from '../components/ShowPost.vue';
import { usePostStore } from '../stores/posts';
import { useAuthStore } from '../stores/auth';

export default {
  components: { ShowPost },
  mounted() {
    this.authStore.getAccess();
  },
  setup() {
    const postStore = usePostStore();
    const authStore = useAuthStore();
    return { postStore, authStore };
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