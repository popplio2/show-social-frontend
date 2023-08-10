<template>
  <h1>Friends</h1>
  <router-link v-for="friend in userStore.friends" :to="/user/ + friend" :key="friend">
    <button>{{ friend }}</button>
  </router-link>
  
  <div class="posts" v-if="friendPosts[0]"> 
    <ShowPost v-for="post in friendPosts" :post="post" :key="post.id"/>
  </div>
  <h2 v-else>Make some friends to see their posts!</h2>
</template>

<script>
import ShowPost from '../components/ShowPost.vue';
import { usePostStore } from '../stores/posts';
import { useUserStore } from '../stores/user';
import { useAuthStore } from '../stores/auth';

export default {
  components: { ShowPost },
  setup() {
    const postStore = usePostStore();
    const userStore = useUserStore();
    const authStore = useAuthStore();

    return { postStore, userStore, authStore };
  },
  mounted() {
    this.authStore.getAccess();
    this.getPosts();
  },
  data() {
    return {
      friendPosts: [],
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
    getPosts() {
      this.userStore.friends.forEach(friendName => {
        const friend = this.userSample.find(user => user.username === friendName);
        friend.posts.forEach(post => {
          this.friendPosts.push(post);
        })
      });
    },
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