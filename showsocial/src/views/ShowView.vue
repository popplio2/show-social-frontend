<template>
  <div v-if="showFetched">
    <h1>{{ show.name }}</h1>
    <img :src="show.image.original" alt="" v-if="show.image">
    <p>{{ show.summary.replace('<p>','').replace('</p>', '') }}</p>
    <h2>Posts for this show:</h2>
    <div class="posts">
      <ShowPost v-for="post in showPosts" :post="post" :key="post.id"/>
    </div>
  </div>
</template>

<script>
import { usePostStore } from '../stores/posts';
import { useAuthStore } from '../stores/auth';

import ShowPost from '../components/ShowPost.vue'
export default {
  components: { ShowPost },
  setup() {
    const postStore = usePostStore();
    const authStore = useAuthStore();

    return { postStore, authStore };
  },
  mounted() {
    this.authStore.getAccess();
    this.fetchData();
  },
  data() {
    return {
      showFetched: false,
      show: null,
      showPosts: null,
    }
  },
  methods: {
    fetchData: async function () { 
      try {
        console.log(this.$route.params.id);
        const result = await fetch(
          `https://api.tvmaze.com/shows/${this.$route.params.id}`
        );
        
        this.show = await result.json();
        this.showPosts = this.postStore.community.filter(post => post.showID === this.show.id);
        this.showFetched = true;
      } catch (error) {
        alert(error);
      }
    },
  }
}
</script>

<style>
  .posts {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 20rem;
    margin: 2rem 0;
  }
</style> 