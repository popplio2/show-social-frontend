<template>
    <header>
      <nav>
        <RouterLink to="/profile">Profile</RouterLink>
      </nav>
  </header>
  <div class="search-bar">
      <div>
        <h1>Find some friends!</h1>
        <span>
          <input @keyup.enter="fetchUsers()" v-model="searchInput" type="text">
          <button @click="fetchUsers()" class="search-btn">Search</button>
        </span>
      </div>
    </div>
    <div class="users">
      <li v-for="user in suggestedUsers" :key="user.username">
        {{ user.username }}
        <h2 v-if="userStore.isFriend(user)">Friends!</h2>
        <!-- <h2 v-else>Friends!</h2> -->
        <router-link :to="/user/ + user.username" v-else>
          <button>View user</button>
        </router-link>
      </li>
    </div>
</template>

<script>
import { useUserStore } from '../stores/user';

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      searchInput: "",
      suggestedUsers: [],
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
    fetchUsers() {
      this.userSample.forEach(user => {
        if (user.username.includes(this.searchInput)) {
          this.suggestedUsers.push(user);
        }
      })
    }
  }
}
</script>

<style>

</style>