<template>
  <form @submit.prevent="registerUser()" onsubmit="return false">
    <h1>Register</h1>
    <label for="username">Username</label>
    <input v-model="username" type="text" name="username" required>

    <!-- <label for="pic">Email</label> 
    <input v-model="email" type="text" id="email" name="email" required>
    -->
    <label for="password">Password</label>
    <input v-model="password" type="text" name="password" required>

    <input type="submit" value="Sign Up"> 

    <h3>Already have an account?</h3>
    <router-link to="/">
      <button>Login</button>
    </router-link>
  </form>
</template>

<script>
import { useUserStore } from '../stores/user';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

export default {
  name: "SignupView",
  setup() {
    const userStore = useUserStore();
    const authStore = useAuthStore();
    return { userStore, authStore };
  },
  data() {
    return {
      username: "",
      password: "",
      // profilePic: "",
    }
  },
  methods: {
    async registerUser() {
      const formData = {
        username: this.username,
        password: this.password
      }
      try {
        const response = await axios.post('http://127.0.0.1:8000/auth/users/', formData)
        console.log(response);
        this.$router.push('/');
      } catch (error) {
        console.log(error);
        alert("An error occurred. Try making your password more complex.")
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