<template>
  <div class="search">
    <div class="search-bar">
      <h1>Search for shows</h1>
      <span>
        <input v-model="searchInput" type="text">
        <button @click="fetchData()" class="search-btn">Search</button>
      </span>
    </div>
    <div class="shows">
      <ShowComponent v-for="show in showArray" :show="show.show" :key="show.show.id"/>
    </div>
  </div>
</template>
<script>
import ShowComponent from '../components/ShowComponent.vue';
export default {
  name: "SearchView",
  components: {
    ShowComponent
  },
  data() {
    return {
      searchInput: "",
      showArray: [],
    }
  },
  methods: {
    fetchData: async function () {
      try {
        const result = await fetch(
          `https://api.tvmaze.com/search/shows?q=${this.searchInput}`
        );
        const showArray = await result.json();
        this.showArray = showArray;
        console.log(showArray);
      } catch (error) {
        alert(error);
      }
    },
  }
}
</script>
<style scoped>
  .search-bar {
    width: 100%;
    padding: auto;
  }
  .shows {
    /* overflow: scroll; */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    background-color: #f3f;
  }
</style>

