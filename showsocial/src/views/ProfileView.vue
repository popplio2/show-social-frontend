<script setup>
import { useShowStore } from '../stores/shows';
const store = useShowStore();
</script>

<template>
  <h1>My Shows:</h1>

  <div v-if="store.showCounter !== 0">
    <div class="sort-btns">
      <button @click="store.sortByName()">Sort alphabetically</button>
      <button @click="store.sortByFirst()">Sort by first added</button> 
      <button @click="store.sortByLast()">Sort by last added</button> 
    </div>
    <div class="my-shows">
      <ShowComponent v-for="show in store.myShows" :show="show" :isAddable="false" :key="show.id" />
    </div>
  </div>

  <h2 v-else>You have no shows added. Go to the search tab to add some!</h2>

</template>

<script>
import ShowComponent from '../components/ShowComponent.vue';

export default {
  components: { 
    ShowComponent 
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