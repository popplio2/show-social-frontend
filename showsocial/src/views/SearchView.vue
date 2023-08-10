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
import { useAuthStore } from '../stores/auth';

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
    const authStore = useAuthStore();

    return { userStore, authStore };
  },
  mounted() {
    this.authStore.getAccess();
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
          
          const filteredArray = [];
          if (this.genreSelected !== null && this.languageSelected !== null) {
            showArray.forEach(show => {
              if (show.show.genres.includes(this.genreSelected) && show.show.language === this.languageSelected) {
                filteredArray.push(show);
              }
            });
            this.showArray = filteredArray;
          } else if (this.genreSelected !== null) {
            showArray.forEach(show => {
              if (show.show.genres.includes(this.genreSelected)) {
                filteredArray.push(show);
              }
            });
            this.showArray = filteredArray;
          } else if (this.languageSelected !== null) {
            showArray.forEach(show => {
              if (show.show.language === this.languageSelected) {
                filteredArray.push(show);
              }
            });
            this.showArray = filteredArray;
          } else {
            this.showArray = showArray;
          }
          if (this.showArray.length === 0) {
            alert(`Could not find any shows with the title: "${this.userStore.searchInput}". Make sure the title is spelled correctly.`)
          }
        } catch (error) {
          alert(error);
        }
      } else {
        alert('Please enter a show title or a keyword.')
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
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }
</style>

