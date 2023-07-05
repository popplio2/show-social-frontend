<template>
  <div v-if="hasUser">
    <!-- <div class="shows">
      <ShowComponent v-for="show in showArray" :show="show.show" :isAddable="true" :key="show.show.id"/>
    </div> -->
    <h1>{{ user.username }}'s Posts</h1>

    <button @click="requestFriend(user.username)" v-if="!isRequested">Send friend request</button>
    <button @click="unsendRequest(user.username)" v-else>Requested</button>

    <div class="posts">
      <ShowPost v-for="post in user.posts" :post="post" :key="post.id"/>
    </div>
  </div>
</template>

<script>
import ShowPost from '../components/ShowPost.vue';
import { usePostStore } from '../stores/posts';
import { useUserStore } from '../stores/user';
export default {
  components: { ShowPost },
  setup() {
    const postStore = usePostStore();
    const userStore = useUserStore();
    return { postStore, userStore };
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      userSample: [
        {
          username: "Dan202",
          email: "",
          myShows: [],
          showCounter: 0,
          posts: [{"id":"32e0a9ea-3531-4a7e-b254-5f7e8c089360","author":"Dan202","showName":"Initial D","showID":9740,"showImage":"https://static.tvmaze.com/uploads/images/original_untouched/459/1148933.jpg","text":"d","datePosted":"[native Date Tue Jul 04 2023 05:02:45 GMT-0400 (Eastern Daylight Time)]","toCommunity":true,"toFriends":false}],
          friendRequests: [],
          friends: [
          ],
        }
      ],
      user: null,
      isRequested: false,
      hasUser: false,
    }
  },
  computed: {
    showPath: function () {
      return `/show/${this.post.showID}`;
    },
  },
  methods: {
    fetchData() {
      this.user = this.userSample.find(user => user.username === this.$route.params.username);
      this.checkRequested();
      this.hasUser = true;
    },
    requestFriend(username) {
      const user = this.userSample.find(user => user.username === username); //finds other user
      const request = {
        sender: this.userStore.username,
        receiver: user.username
      };
      this.userStore.friendRequests.push(request);
      user.friendRequests.push(request);
      this.checkRequested();
    },
    unsendRequest(username) {
      if (confirm("Do you want to unsend your friend request?") == true) {
        const user = this.userSample.find(user => user.username === username);
        const request = user.friendRequests.find(request => request.sender === this.userStore.username);
        user.friendRequests.pop(request); //deletes request from other user
        const myRequest = this.userStore.friendRequests.find(request => request.receiver === this.user.username);
        this.userStore.friendRequests.pop(myRequest); //deletes request from your data
      }
      this.checkRequested();
    },
    checkRequested() {
      if (this.userStore.friendRequests.find(request => request.receiver === this.user.username)) {
        this.isRequested = true;
      } else {
        this.isRequested = false;
      }
    }
  } 
}
</script>

<style scoped>
  .posts { 
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }
</style> 