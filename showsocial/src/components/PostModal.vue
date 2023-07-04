<template>
  <div class="post-wrapper">
    <button @click="$emit('closePostModal')">Close</button>
    <div class="post-contents">
      <div>
        <h2>I'm watching {{ show.name }}!</h2>
        <img :src="show.image.original" alt="" v-if="show.image">
        <p v-else>(Image not available)</p>
      </div>
      <form onsubmit="return false"> 
        <label for="post-text">Write what you think about "{{ show.name }}".</label><br>
        <textarea v-model="postText" name="post-text" id="post-text" cols="30" rows="10" placeholder="Write what you think here" required></textarea>
        <h3>Post to:</h3>
        <input class="checkbox-1" @change="toCommunity = !toCommunity" type="checkbox" id="community" name="community" value="Community">
        <label for="community">Community</label><br>
        <input @change="toFriends = !toFriends" type="checkbox" id="friends" name="friends" value="Friends">
        <label for="friends">Friends</label><br>
        <h4>(This can be changed later)</h4>

        <button @click="postShow()">Submit</button>
      </form> 
    </div>
  <!-- create post function that adds post object to vuex, each post object should be tagged with community and friends properties that are booleans and can be edited -->
  <!-- should check to make sure at least one checkbox is checked, otherwise throw an error -->
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

import { useUserStore } from '../stores/user';
import { usePostStore } from '../stores/posts';

export default {
  props: {
    show: Object,
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
    const userStore = useUserStore();
    return { postStore, userStore};
  },
  methods: {
    postShow() {
      document.getElementById('community').setCustomValidity('');
      if (this.toCommunity || this.toFriends) {
        const postObject = {
          id: uuidv4(), //creates unique id for the post
          author: this.userStore.username,
          showName: this.show.name,
          showID: this.show.id,
          showImage: this.show.image.original,
          text: this.postText,
          datePosted: new Date(),
          toCommunity: this.toCommunity,
          toFriends: this.toFriends,
          // likes: 0,
        };
        if (this.toCommunity && this.toFriends) {
          this.postStore.addToBoth(postObject);
        } else if (this.toCommunity) {
          this.postStore.addToCommunity(postObject);
        } else { // if(this.toFriends)
          this.postStore.addToFriends(postObject)
        }
        this.userStore.addToPosts(postObject);
      }
       else {
        document.getElementById('community').setCustomValidity("Select at least one place to post.");
      }
    },
  }
}
</script>

<style scoped>
  .post-wrapper {
    position: absolute;
    width: fit-content;
    height: fit-content;
    margin: auto;
    left: 0;right: 0;top: 0;bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ac93ff;
    padding: 2rem;
    z-index: 1;
  }
  .post-contents {
    display: flex;
    gap: 2rem;
  }
  .post-contents img {
    object-fit: cover;
    width: 10rem;
    height: 15rem;
  }
</style>