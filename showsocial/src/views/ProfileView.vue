<template>
  <div>
    <!-- <img :src="userStore.profilePic" alt="" v-if="userStore.profilePic">
    <h1 v-else>Oof no profile pic 0_0</h1> -->
    <h1>{{ userStore.username }}'s Friends</h1>
    <ul v-if="friendRequests">
      <li v-for="request in friendRequests" :key="request.sender">
        <p>{{ request.sender }} wants to be your friend</p>
        <button @click="approveRequest(request.sender)">Accept</button>
        <button @click="deleteRequest(request.sender)">Decline</button>
      </li>
    </ul>
    <div v-if="userStore.friends.length !== 0">
      <ul>
        <li v-for="friend in userStore.friends" :key="friend">{{ friend }}</li>
      </ul>
    </div>
    <h2 v-else>You have no friends added. Search for friends here.</h2>
    <RouterLink to="/find-friends">
      <button>Find friends</button>
    </RouterLink>
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

    <div>
      <h1>{{ userStore.username }}'s Posts</h1>
      <div v-if="userStore.posts.length > 0">
        <div class="my-shows">
          <ShowPost v-for="post in userStore.posts" :post="post" :key="post.id"/>
        </div>
      </div>
      <h2 v-else>You haven't made any posts. Add some shows to make some!</h2>
    </div>
  </div>

</template>

<script>
import { useUserStore } from '../stores/user';
import ShowComponent from '../components/ShowComponent.vue';
import PostModal from '../components/PostModal.vue';
import ShowPost from '../components/ShowPost.vue';

export default {
  components: { 
    ShowComponent,
    PostModal,
    ShowPost 
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  mounted() {
    this.getRequests();
  },
  data() {
    return {
      showPost: null,
      friendRequests: [],
      userSample: [
        {
          username: "Dan202",
          email: "",
          myShows: [],
          showCounter: 0,
          posts: [{"id":"32e0a9ea-3531-4a7e-b254-5f7e8c089360","author":"Dan202","showName":"Initial D","showID":9740,"showImage":"https://static.tvmaze.com/uploads/images/original_untouched/459/1148933.jpg","text":"d","datePosted":"[native Date Tue Jul 04 2023 05:02:45 GMT-0400 (Eastern Daylight Time)]","toCommunity":true,"toFriends":false}],
          friendRequests: [
            {
              sender: 'Dan202',
              receiver: 'Dan'
            }],
          friends: [],
        }
      ],
    }
  },
  methods: {
    postShow(show) {
      this.showPost = show;
    },
    getRequests() {
      this.userStore.friendRequests.forEach(request => {
        if (request.receiver === this.userStore.username) {
          this.friendRequests.push(request);
        }
      });
    },
    approveRequest(username) {
      this.userStore.approveRequest(username);
      this.userSample[0].friends.push(this.userStore.username); //for other user
      this.deleteRequest(username);
    },
    deleteRequest(username) {
      this.userStore.deleteRequest(username);
      const localRequest = this.friendRequests.findIndex(request => request.sender === username);
      this.friendRequests.splice(localRequest, 1);
      //for other user
      const senderRequest = this.userSample[0].friendRequests.findIndex(request => request.receiver === this.userStore.username);
      this.userSample[0].friendRequests.splice(senderRequest, 1);
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