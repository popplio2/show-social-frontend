<script setup>
import { useShowStore } from '../stores/shows';
const store = useShowStore();
</script>

<template>
  <div class="search">
    <div class="search-bar">
      <div>
        <h1>Find shows</h1>
        <span>
          <input @keyup.enter="fetchData()" v-model="store.searchInput" type="text">
          <button @click="fetchData()" class="search-btn">Search</button>
        </span>
      </div>
    </div>
    <div class="shows">
      <ShowComponent v-for="show in showArray" :show="show.show" :isAddable="true" :key="show.show.id"/>
    </div>
  </div>
</template>
<script>
const store = useShowStore(); //this has to be here for it to work for some reason

import ShowComponent from '../components/ShowComponent.vue';
export default {
  name: "SearchView",
  components: {
    ShowComponent
  },
  data() {
    return {
      showArray: [],
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData: async function () { 
      if (store.searchInput !== "") { // makes sure input isn't blank
        try {
        console.log(store.searchInput);
        const result = await fetch(
          `https://api.tvmaze.com/search/shows?q=${store.searchInput}`
        );
        const showArray = await result.json();
        this.showArray = showArray;
        if (this.showArray.length === 0) {
          alert(`Could not find any shows with the title: "${store.searchInput}". Check for typos and try again.`)
        }
      } catch (error) {
        alert(error);
      }
      }
    },
  }
}
</script>
<style scoped>
  .search-bar {
    display: flex;
    justify-content: center;
  }
  .shows {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    background-color: #f3f;
  }
</style>

