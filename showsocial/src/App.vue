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
import { useAuthStore } from './stores/auth';
import axios from 'axios';

export default {
  name: "App",
  data() {
    return {
    }
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
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
    setInterval(() => {
      this.getAccess();
    }, 5000);
  },
  methods: {
    getAccess() {
      const accessData = {
        refresh: this.authStore.refresh
      }

      axios
          .post('http://127.0.0.1:8000/auth/jwt/refresh/', accessData)
          .then(response => {
            const access = response.data.access;
            localStorage.setItem('access'), access;
            this.authStore.setAccess(access);
          })
          .catch(error => {
            console.log(error);
          });
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
