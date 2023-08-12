<template>
  <form @submit.prevent="loginUser()" onsubmit="return false">
    <h1>Login</h1>
    <label for="username">Username</label>
    <input v-model="username" type="text" id="username" name="username" required>

    <label for="password">Password</label>
    <input v-model="password" type="text" id="password" name="password" required>

    <input type="submit" value="Login"> 

    <h3>Don't have an account?</h3>
    <router-link to="/signup">
      <button>Sign Up</button>
    </router-link>
    <!-- <button @click="getCurrentUser()">Get user</button> -->
  </form>
</template>

<script>
import { useUserStore } from '../stores/user';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

export default {
  name: "LoginView",
  setup() {
    const userStore = useUserStore();
    const authStore = useAuthStore();
    return { userStore, authStore };
  },
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    async loginUser() {
      axios.defaults.headers.common['Authorization'] = '';
      localStorage.removeItem("access");

      const formData = {
        username: this.username,
        password: this.password
      }
      try {
        const response = await axios.post('http://127.0.0.1:8000/auth/jwt/create/', formData);
        console.log(response);
        const access = response.data.access;
        const refresh = response.data.refresh;

        this.authStore.setAccess(access);
        this.authStore.setRefresh(refresh);

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access;
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);

        this.authStore.getMe();

        this.$router.push('/profile');
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style scoped>
  form {
    position: absolute;
    width: fit-content;
    height: fit-content;
    margin: auto;
    left: 0;right: 0;top: 0;bottom: 0;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    align-items: center;
    background-color: #ac93ff;
    padding: 2rem;
    z-index: 1;
  }
</style>