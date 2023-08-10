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
    this.getAccess();
    this.getMe();
    setInterval(() => {
      this.getAccess();
    }, 60000);
  },
  methods: {
    async getAccess() {
      const accessData = {
        refresh: this.authStore.refresh
      }
      try {
        const response = await axios.post('http://127.0.0.1:8000/auth/jwt/refresh/', accessData);
        console.log(response);
        const access = response.data.access;
        localStorage.setItem('access', access);
        this.authStore.setAccess(access);
      } catch (error) {
        console.log(error);
        alert('Please log in to view this.');
        this.$router.push('/');
      }
    },
    async getMe() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/auth/users/me");
        console.log(response);
        this.userStore.id = response.data.id;
        this.userStore.username = response.data.username;
        this.$router.push('/profile');
      } catch(error) {
          console.log(error);
      }
    }
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
