<template>
  <form @submit="submitForm()" onsubmit="return false">
    <h1>Sign up</h1>

    <label for="pic">Add a profile picture (optional)</label>
    <input @change="loadFile(event)" type="file" id="pic" name="pic" accept="image/*">
    <img class="preview" src="" alt="">
    <label for="pic">Username</label>
    <input v-model="username" type="text" id="username" name="username" required>

    <label for="pic">Email</label>
    <input v-model="email" type="text" id="email" name="email" required>
    <input type="submit" value="Register">
  </form>
</template>

<script>
import { useUserStore } from '../stores/user';
export default {
  name: "SignupModal",
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      username: "",
      email: "",
      profilePic: "",
    }
  },
  methods: {
    loadFile(event) { //credit to Brian Burns on stackoverflow
      const preview = document.querySelector('.preview');
      preview.src = URL.createObjectURL(event.target.files[0]);

      this.profilePic = preview.src;
      console.log(this.profilePic);

      preview.onload = function() {
        URL.revokeObjectURL(preview.src) // free memory
      }
    },
    submitForm() {
      alert('ehlp');
      this.userStore.username = this.username;
      this.userStore.email = this.email;
      this.userStore.profilePic = this.profilePic;
      this.$emit('sign-in');
    }
  }
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