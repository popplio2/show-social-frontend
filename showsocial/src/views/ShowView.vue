<template>
  <div v-if="showFetched">
    <button @click="alert">nfekms</button>
    <h1>{{ show.name }}</h1>
    <h2>{{ show.summary.replace('<p>','').replace('</p>', '') }}</h2>
    <ShowPost v-for="post in showPosts" :post="post" :key="post.showName"/>
  </div>
</template>

<script>
import { usePostStore } from '../stores/posts';
import ShowPost from '../components/ShowPost.vue'
export default {
  components: { ShowPost },
  setup() {
    const postStore = usePostStore();
    return { postStore };
  },
  mounted() {
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

</style>