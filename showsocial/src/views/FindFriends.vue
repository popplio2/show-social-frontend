<template>
    <header>
      <nav>
        <RouterLink to="/profile">Profile</RouterLink>
      </nav>
  </header>
  <div class="search-bar">
      <div>
        <h1>Find some friends!</h1>
        <!-- <span>
          <input @keyup.enter="fetchUsers()" v-model="searchInput" type="text">
          <button @click="fetchUsers()" class="search-btn">Search</button>
        </span> -->
      </div>
    </div>
    <!-- <div class="users">
      <li v-for></li>
    </div> -->
</template>

<script>
export default {
  data() {
    return {
      searchInput: "",
      userSample: [
        {
          username: "Dan202",
          email: "",
          myShows: [],
          showCounter: 0,
          posts: [],
          friendRequests: [],
          friends: [],
        }
      ]
    }
  },
  methods: {
    fetchUsers() {

    }
  }
}
</script>

<style>

</style>