<template>
  <!-- <SignupModal @sign-in="isRegistered = true;" v-if="!isRegistered" /> -->
  <header> 
      <nav>
        <RouterLink to="/">Community</RouterLink>
        <RouterLink to="/friends">Friends</RouterLink>
        <RouterLink to="/search">Search Shows</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
      </nav>
  </header>

  <RouterView />

  
</template>

<script>
// import SignupModal from './components/SignupModal.vue'
export default {
  // components: { SignupModal },
  data() {
    return {
      isRegistered: false,
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
