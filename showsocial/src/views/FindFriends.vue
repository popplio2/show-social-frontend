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
        <router-link :to="/user/ + user.username" v-else>
          <button>View user</button>
        </router-link>
      </li>
    </div>
</template>

<script>
import { useUserStore } from '../stores/user';
import { useAuthStore } from '../stores/auth';

import axios from 'axios';

export default {
  setup() {
    const userStore = useUserStore();
    const authStore = useAuthStore();

    return { userStore, authStore };
  },
  data() {
    return {
      searchInput: "",
      suggestedUsers: [],
    }
  },
  mounted() {
    this.authStore.getAccess();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/?search=${this.searchInput}`);
        console.log(response);
        this.suggestedUsers = response.data;
      } catch (error) {
        alert('No users found with that username. Check for misspelling or typos.')
        console.log(error);
      }
    }
  }
}
</script>

<style>

</style>