<template>
  <div class="search">
    <div class="search-bar">
      <div>
        <h1>Find shows</h1>
        <span>
          <input @keyup.enter="fetchData()" v-model="userStore.searchInput" type="text">
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
import { useUserStore } from '../stores/user';
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
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData: async function () { 
      if (this.userStore.searchInput !== "") { // makes sure input isn't blank
        try {
        console.log(this.userStore.searchInput);
        const result = await fetch(
          `https://api.tvmaze.com/search/shows?q=${this.userStore.searchInput}`
        );
        const showArray = await result.json();
        this.showArray = showArray;
        if (this.showArray.length === 0) {
          alert(`Could not find any shows with the title: "${this.userStore.searchInput}". Check for typos and try again.`)
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

