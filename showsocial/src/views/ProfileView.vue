<script setup>
import { useShowStore } from '../stores/shows';
const showStore = useShowStore();
</script>

<template>
  <h1>{{ showStore.username }}'s Shows</h1>

  <div v-if="showStore.showCounter !== 0">
    <div class="sort-btns">
      <button @click="showStore.sortByName()">Sort alphabetically</button>
      <button @click="showStore.sortByFirst()">Sort by first added</button> 
      <button @click="showStore.sortByLast()">Sort by last added</button> 
    </div>
    <div class="my-shows">
      <ShowComponent @post="postShow(show)" v-for="show in showStore.myShows" :show="show" :isAddable="false" :key="show.id" />
    </div>
  </div>
  <h2 v-else>You have no shows added. Go to the search tab to add some!</h2>

  <ShowPost @closePostModal="showPost = null" :show="showPost" v-if="showPost"/>
</template>

<script>
import ShowComponent from '../components/ShowComponent.vue';
import ShowPost from '../components/ShowPost.vue';

export default {
  components: { 
    ShowComponent,
    ShowPost 
  },
  data() {
    return {
      showPost: null,
    }
  },
  methods: {
    postShow(show) {
      this.showPost = show;
    }
  }
}
</script>

<style>
  .my-shows {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    background-color: #f3f;
  }
</style>