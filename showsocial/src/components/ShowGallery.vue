<template>
  <ShowComponent v-for="show in showArray" :show="show.show" :key="show.id"/>
</template>

<script>
import ShowComponent from './ShowComponent.vue';
export default {
  name: "ShowGallery",
  mounted() {
    this.fetchData();
  },
  components: {
    ShowComponent,
  },
  props: {
    input: String,
  },
  data() {
    return {
      showArray: [],
    }
  },
  methods: {
    fetchData: async function () {
      try {
        const result = await fetch(
          `https://api.tvmaze.com/search/shows?q=${this.input}`
        );
        const showArray = await result.json();
        this.showArray = showArray;
      } catch (error) {
        alert(error);
      }
    },
  },
}
</script>

<style>

</style>