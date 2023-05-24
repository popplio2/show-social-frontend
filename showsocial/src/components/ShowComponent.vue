<template>
  <div class="show-wrapper">
    <p>{{ show.name }}</p>
    <img :src="show.image.original" alt="">
  </div>
</template>

<script>
export default {
  name: "ShowComponent",
  props: {
    show: Object,
  },
}
</script>

<style scoped>
  .show-wrapper {
    background-color: #fff;
    margin: 2rem;
    padding: 2rem;
  }
  img {
    object-fit: cover;
    width: 10rem;
    height: 15rem;
  }
</style>