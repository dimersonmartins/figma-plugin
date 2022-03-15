<template>
  <div>
    <div class="box" style="height: 150px">
      <article class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="getImage(data.image)" alt="Image" />
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <strong>{{data.title}}</strong>
          </div>
          <div v-for="(row, index) in data.options" :key="index">
            <button
              class="button is-info is-light is-small"
              @click="$router.push(row.router)"
              style="width: 100%"
            >{{row.text}}</button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object }
  },
  methods: {
    getImage(imageName) {
      return require("../../assets/images/" + imageName);
    }
  }
};
</script>

<style>
</style>