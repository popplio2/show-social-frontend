<script setup>
import { useUserStore } from '../stores/user';
const userStore = useUserStore();
</script>

<template>
  <RouterLink to="/find-friends">
    <button>Find friends</button>
  </RouterLink>
  
  <div>
    <!-- <img :src="userStore.profilePic" alt="" v-if="userStore.profilePic">
    <h1 v-else>Oof no profile pic 0_0</h1> -->
    <h1>{{ userStore.username }}'s Friends</h1>
    <div v-if="userStore.friends.length !== 0">
      <div>
        <h2 v-for="friend in userStore.friends" :key="friend.id">{{ friend.name }}</h2>
      </div>
    </div>
    <h2 v-else>You have no friends added. Search for friends here.</h2>
    <!-- Search bar, options to search by username or ID, send request -->
  </div>

  <div>
    <h1>{{ userStore.username }}'s Shows</h1>
    <div v-if="userStore.showCounter !== 0">
      <div class="sort-btns">
        <button @click="userStore.sortByName()">Sort alphabetically</button>
        <button @click="userStore.sortByFirst()">Sort by first added</button> 
        <button @click="userStore.sortByLast()">Sort by last added</button> 
      </div>
      <div class="my-shows">
        <ShowComponent @post="postShow(show)" v-for="show in userStore.myShows" :show="show" :isAddable="false" :key="show.id" />
      </div>
    </div>
    <h2 v-else>You have no shows added. Go to the search tab to add some!</h2>

    <PostModal @closePostModal="showPost = null" :show="showPost" v-if="showPost"/>
  </div>

</template>

<script>
import ShowComponent from '../components/ShowComponent.vue';
import PostModal from '../components/PostModal.vue';

export default {
  components: { 
    ShowComponent,
    PostModal 
  },
  data() {
    return {
      showPost: null,
    }
  },
  methods: {
    postShow(show) {
      this.showPost = show;
    }
  }
}
</script>

<style>
  .my-shows {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }
</style>