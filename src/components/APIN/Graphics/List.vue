<template>
  <div>
    <div
      class="columns is-gapless"
      v-for="(trackings, index) in gridContent"
      :key="index"
    >
      <div class="column"></div>
      <div class="column is-four-fifths" v-if="trackings">
        <div class="box">
          <span class="tag is-dark">{{trackings[index].category}}</span>
          <hr />
          <div class="columns is-gapless">
            <div class="column">Ação</div>
            <div class="column">Total</div>
          </div>
          <div
            style="overflow: auto"
            class="columns is-gapless notification is-link is-light"
            v-for="(track, idx) in trackings"
            :key="idx"
          >
            <div class="column">{{track.action}}</div>
            <div class="column">{{track.count}}</div>
          </div>
        </div>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gridContent: { type: Array }
  },
  methods: {
   
  },
  mounted() {

  }
};
</script>

<style>
</style>