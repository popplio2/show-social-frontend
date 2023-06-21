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
    <div>
      <button @click="setGenre('Comedy')">Comedy</button>
      <button @click="setLanguage('English')">English</button>
      <button @click="setGenre('Drama'); setLanguage('Korean');">K-Drama</button>
      <button @click="setGenre('Anime'); setLanguage('Japanese');">Anime</button>
      <h2 @click="genreSelected = null" v-if="genreSelected">x {{ genreSelected }}</h2>
      <h2 @click="languageSelected = null" v-if="languageSelected">x {{ languageSelected }}</h2>
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
      genreSelected: null,
      languageSelected: null,
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
    setGenre(genre) {
      this.genreSelected = genre;
    },
    setLanguage(language) {
      this.languageSelected = language;
    },
    fetchData: async function () { 
      if (this.userStore.searchInput !== "") { // makes sure input isn't blank
        try {
        console.log(this.userStore.searchInput);
        const result = await fetch(
          `https://api.tvmaze.com/search/shows?q=${this.userStore.searchInput}`
        );
        const showArray = await result.json();

        if (this.genreSelected !== null) {
          alert('filtering genres')
          showArray.forEach(show => {
            if (!show.show.genres.includes(this.genreSelected)) {
              console.log(`${show.show.name} genres includes ${this.genreSelected}: ${show.show.genres.includes(this.genreSelected)}`);
              showArray.pop(show);
            }
          });
        }
        if (this.languageSelected !== null) {
          alert('filtering languages')
          showArray.forEach(show => {
            if (show.show.language !== this.languageSelected) {
              console.log(`${show.show.name} language is ${this.languageSelected}: ${show.show.language === this.languageSelected}`);
              showArray.pop(show);
            }
          });
        }
  
        this.showArray = showArray;
        if (this.showArray.length === 0) {
          alert(`Could not find any shows with the title: "${this.userStore.searchInput}". Make sure the title is spelled correctly.`)
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

