<template>
  <div class="post-wrapper">
    <h3>I'm watching {{ post.showName }}!</h3>
    <div class="post-contents">
      <div>
        <img :src="post.showImage" alt="" v-if="post.showImage">
        <p v-else>(Image not available)</p>
      </div>
      <div class="post-text">
        <p>{{ post.text }}</p>
        <h4>{{ post.author }}</h4>
        <span>
          <h4>{{ post.datePosted }}</h4>
          <h4>{{ post.timePosted }}</h4>
        </span>
      </div>
    </div>
 </div>
</template>

<script>
import { usePostStore } from '../stores/posts';

export default {
  props: {
    post: Object,
  },
  data() {
    return {
      postText: "",
      toCommunity: false,
      toFriends: false,
    }
  },
  setup() {
    const postStore = usePostStore();
    return { postStore };
  },
}
</script>

<style scoped>
  .post-wrapper {
    flex-basis: 35rem; /* Minimum width of 30rem */
    flex-grow: 1; /* Allow items to grow and fill up remaining space */
    max-width: calc(100% / 3); /* Divide the container into equal columns */
    
    align-items: center;
    border: .1rem black solid;
    border-radius: 1rem;
    padding: 2rem;
    transition: .3s all;
  }
  .post-wrapper:hover {
    transform: scale(1.05);
  }
  .post-contents {
    display: flex;
    flex-direction: row;
    gap: 2rem;
  }
  .post-contents img {
    object-fit: cover;
    height: 10rem;
  }
  /* .post-text p {
    height: 10rem;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
  } */

/* Media queries for responsive behavior */
@media screen and (max-width: 1200px) {
  .post-wrapper {
    max-width: calc(100% / 2); /* Two columns on smaller screens */
  }
}

@media screen and (max-width: 768px) {
  .post-wrapper {
    max-width: 100%; /* Single column on the smallest screens */
  }
}

</style>