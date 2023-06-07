<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

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
