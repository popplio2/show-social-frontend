<template>
  <div class="post-contents" v-if="hasPost">
    <router-link :to="showPath">
      <h2>{{ post.showName }}</h2>
      <img :src="post.showImage" alt="" v-if="post.showImage">
      <p v-else>(Image not available)</p>
    </router-link>
    <p>"{{ post.text }}"</p>
    <router-link :to="userPath">
      <h4>By {{ post.author }}</h4>
    </router-link>
    <h4>Posted on {{ post.datePosted.toLocaleString() }}</h4>
    <!-- <button @click="post.likes+=1">❤️{{ post.likes }}</button> -->
    </div>
</template>

<script>
import { usePostStore } from '../stores/posts';
import { useUserStore } from '../stores/user';
export default {
  setup() {
    const postStore = usePostStore();
    const userStore = useUserStore();
    return { postStore, userStore };
  },
  mounted() {
    this.getPost();
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
    userPath: function () {
      return `/user/${this.post.author}`;
    },
  },
  methods: {
    getPost() {
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