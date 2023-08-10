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
import axios from 'axios';

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
    async getUser() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/?username=${this.$route.params.username}`);
        this.user = response.data[0];
        // this.checkRequested();
        this.hasUser = true;
      } catch(error) {
          console.log(error);
      }
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