<template>
  <div v-if="hasUser">
    <!-- <div class="shows">
      <ShowComponent v-for="show in showArray" :show="show.show" :isAddable="true" :key="show.show.id"/>
    </div> -->
    <h1>{{ user.username }}'s Posts</h1>

    <button @click="requestFriend()" v-if="!isRequested && !isFriend">Send friend request</button>
    <button @click="deleteFriend()" v-if="isFriend">Friends</button>
    <button @click="unsendRequest()" v-if="isRequested">Requested</button>

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
    this.getUser();
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
          friendRequests: [
            {
              sender: 'Dan202',
              receiver: 'Dan'
            }],
          friends: [],
        }
      ],
      user: null,
      isRequested: false,
      isFriend: false,
      hasUser: false,
    }
  },
  computed: {
    showPath: function () {
      return `/show/${this.post.showID}`;
    },
  },
  methods: {
    getUser() {
      this.user = this.userSample.find(user => user.username === this.$route.params.username);
      this.checkRequested();
      this.hasUser = true;
    },
    requestFriend() {
      const request = {
        sender: this.userStore.username,
        receiver: this.user.username
      };
      this.userStore.friendRequests.push(request);
      this.user.friendRequests.push(request);
      this.checkRequested();
    },
    unsendRequest() {
      if (confirm("Do you want to unsend your friend request?") == true) {
        const request = this.user.friendRequests.findIndex(request => request.sender === this.userStore.username);
        this.user.friendRequests.splice(request, 1); //deletes request on other user's end
        const myRequest = this.userStore.friendRequests.findIndex(request => request.receiver === this.user.username);
        this.userStore.friendRequests.splice(myRequest, 1); //deletes request on your end
      }
      console.log(this.user.friendRequests);
      console.log(this.userStore.friendRequests);
      this.checkRequested();
    },
    deleteFriend() {
      if (confirm(`Do you want to remove ${this.user.username} as your friend?`) == true) {
        const me = this.user.friends.findIndex(friend => friend === this.userStore.username);
        this.user.friends.splice(me, 1); //deletes request on other user's end
        const friend = this.userStore.friends.findIndex(friend => friend === this.user.username);
        this.userStore.friends.splice(friend, 1); //deletes request on your end
      }
      this.checkRequested();
    },
    checkRequested() {
      const isRequested = this.userStore.friendRequests.find(request => request.receiver === this.user.username);
      const isFriend = this.userStore.isFriend(this.user.username);
      if (isRequested && isFriend) {
        this.isRequested = true;
        this.isFriend = true;
      } else if (isRequested) {
        this.isRequested = true;
      } else if (isFriend) {
        this.isFriend = true;
      } else {
        this.isRequested = false;
        this.isFriend = false;
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