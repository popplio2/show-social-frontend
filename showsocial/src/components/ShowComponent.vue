<template>
  <div class="show-wrapper">
    <p>{{ show.name }}</p>
    <img :src="show.image.original" alt="" v-if="!fromDB && show.image">
    <img :src="show.image" alt="" v-if="fromDB && show.image">
    <p v-if="!show.image">(Image not available)</p>

    <button @click="addShow()" class="add-btn" v-if="isAddable">Add show</button>
    <button @click="$emit('post')" class="add-btn" v-else>Post show</button>
    <router-link :to="showPath">
      <button class="add-btn">More info</button>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ShowComponent",
  props: {
    show: Object,
    fromDB: Boolean,
    isAddable: Boolean,
  },
  computed: {
    showPath: function () {
      return `/show/${this.show.id}`;
    },
  },
  methods: {
    async addShow() {
      const showData = {
        id: this.show.id,
        name: this.show.name,
        image: this.show.image ? this.show.image.original : null
      }
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/shows/add/', showData);
        console.log(response);
        alert("Added show!")
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
   .show-wrapper {
    flex-basis: 20rem; /* Minimum width */
    flex-grow: 1; /* Allow items to grow and fill up remaining space */
    max-width: calc(100% / 5); /* Divide the container into equal columns */
    
    display: flex;
    flex-direction: column;
    align-items: center;
    border: .1rem black solid;
    border-radius: 1rem;
    padding: 2rem;
    transition: .3s all;
  }
  .show-wrapper:hover {
    transform: scale(1.05);
  }
  img {
    object-fit: cover;
    height: 15rem;
    width: 90%;
  }
  button {
    margin-top: 2rem;
  }
  p {
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Media queries for responsive behavior */
@media screen and (max-width: 1200px) {
  .show-wrapper {
    max-width: calc(100% / 4); /* four columns */
  }
}

@media screen and (max-width: 768px) {
  .show-wrapper {
    max-width: calc(100% / 2); /* two columns */
  }
}
@media screen and (max-width: 480px) {
  .show-wrapper {
    max-width: 100% /* Single column on the smallest screens */
  }
}
</style>