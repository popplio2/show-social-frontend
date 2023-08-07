<template>
  <form @submit="registerUser()" onsubmit="return false">
    <h1>Register</h1>
    <label for="username">Username</label>
    <input v-model="username" type="text" id="username" name="username" required>

    <!-- <label for="pic">Email</label> 
    <input v-model="email" type="text" id="email" name="email" required>
    -->
    <label for="password">Password</label>
    <input v-model="password" type="text" id="password" name="password" required>

    <input type="submit" value="Sign Up"> 

    <router-link to="/">
      <h3>Already have an account?</h3>
      <button>Login</button>
    </router-link>
  </form>
</template>

<script>
import { useUserStore } from '../stores/user';
export default {
  name: "SignupView",
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      // profilePic: "",
    }
  },
  methods: {
    // loadFile(event) { //credit to Brian Burns on stackoverflow
    //   const preview = document.querySelector('.preview');
    //   preview.src = URL.createObjectURL(event.target.files[0]);

    //   this.profilePic = preview.src;
    //   console.log(this.profilePic);

    //   preview.onload = function() {
    //     URL.revokeObjectURL(preview.src) // free memory
    //   }
    // },
    // submitForm() {
    //   alert('ehlp');
    //   this.userStore.username = this.username;
    //   this.userStore.email = this.email;
    //   this.userStore.profilePic = this.profilePic;
    //   this.$emit('sign-in');
    // },
    async registerUser() {
      try {
        console.log(this.username + " " + this.password);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            username: this.username,
            // email: this.email,
            password: this.password
          })
        };
        const response = await fetch("http://127.0.0.1:8000/user/register/", requestOptions);
        console.log(response.json());

        this.getCurrentUser();

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
          headers: {
            'Content-Type': 'application/json',
            // Add any required headers (e.g., authentication token) here
          },
          credentials: 'include', // This includes cookies and other credentials
        });
        const data = await response.json();
        this.userStore.username = data.username;
        console.log(this.userStore.username);
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