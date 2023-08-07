<template>
  <form @submit="loginUser()" onsubmit="return false">
    <h1>Login</h1>
    <label for="username">Username</label>
    <input v-model="username" type="text" id="username" name="username" required>

    <label for="password">Password</label>
    <input v-model="password" type="text" id="password" name="password" required>

    <input type="submit" value="Login"> 

    <router-link to="/signup">
      <h3>Don't have an account?</h3>
      <button>Sign Up</button>
    </router-link>
    <button @click="getCurrentUser()">Get user</button>
  </form>
</template>

<script>
import { useUserStore } from '../stores/user';
export default {
  name: "LoginView",
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
    }
  },
  methods: {
    async loginUser() {
      try {
        const response = await fetch('http://127.0.0.1:8000/user/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            username: this.username,
            // email: this.email,
            password: this.password
          }),
        });
        console.log(await response.json());
        // Handle the successful login (e.g., redirect the user to a dashboard page)
      } catch (error) {
        alert(error);
        // Handle the login error (e.g., show an error message to the user)
      }
    },
    async getCurrentUser() {
      try {
        const response = await fetch('http://127.0.0.1:8000/user/current/', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        console.log(data);
        this.userStore.id = data.id;
        this.userStore.username = data.username;
        console.log(this.userStore.username);
        console.log(this.userStore.id);
      } catch (error) {
        alert(error);
        // Handle error
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