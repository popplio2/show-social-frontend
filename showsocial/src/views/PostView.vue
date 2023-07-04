<template>
  <div class="post-contents" v-if="hasPost">
    <router-link :to="showPath">
      <h2>{{ post.showName }}</h2>
      <img :src="post.showImage" alt="" v-if="post.showImage">
      <p v-else>(Image not available)</p>
    </router-link>
    <p>{{ post.text }}</p>
    <h4>{{ post.author }}</h4>
    <h4>{{ post.datePosted }}</h4>
    <h4>{{ post.timePosted }}</h4>
    </div>
</template>

<script>
import { usePostStore } from '../stores/posts';
export default {
  setup() {
    const postStore = usePostStore();
    return { postStore };
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      post: null,
      hasPost: false,
    }
  },
  computed: {
    showPath: function () {
      return `/show/${this.post.showID}`;
    },
  },
  methods: {
    fetchData() {
      console.log(this.postStore.community);
      this.post = this.postStore.community.find(post => post.id === this.$route.params.id);
      this.hasPost = true;
    },
  }
}
</script>

<style scoped>
  /* .post-wrapper {
    align-items: center;
    border: .1rem black solid;
    border-radius: 1rem;
    padding: 2rem;
    transition: .3s all;
  }
  .post-wrapper:hover {
    transform: scale(1.05);
  } */
  img {
    object-fit: cover;
    width: 100%;
    height: 20rem;
  }
</style> 