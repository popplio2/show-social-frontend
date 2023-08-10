<template>
  <header> 
      <nav>
        <RouterLink to="/community">Community</RouterLink>
        <RouterLink to="/friends">Friends</RouterLink>
        <RouterLink to="/search">Search Shows</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
      </nav>
  </header>

  <RouterView />

  
</template>

<script>
import { useUserStore } from './stores/user';
import { useAuthStore } from './stores/auth';
import axios from 'axios';

export default {
  name: "App",
  data() {
    return {
    }
  },
  setup() {
    const userStore = useUserStore();
    const authStore = useAuthStore();
    return { userStore, authStore };
  },
  beforeCreate() {
    this.authStore.initializeStore();
    const access = this.authStore.access;

    if (access) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + access;
    } else {
      axios.defaults.headers.common['Authorization'] = "";
    }
  },
  mounted() {
    this.authStore.getAccess();
    this.authStore.getMe();
    setInterval(() => {
      this.authStore.getAccess();
    }, 60000);
  },
  methods: {
  }
}
</script>

<style scoped>
  header {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  nav {
    margin-bottom: 2rem;
  }
  a {
    font-size: 1rem;
    padding: 1rem;
  }
</style>
