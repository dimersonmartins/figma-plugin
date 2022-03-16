<template>
  <div>
    <div class="columns is-gapless" v-for="(tracking, index) in gridContent" :key="index">
      <div class="column"></div>
      <div class="column is-four-fifths" v-if="tracking.group">
        <div class="box">
          <span class="tag is-dark">{{tracking.group[0].category}}</span>
          <span class="tag is-info">{{tracking.group[0].totalActions}}</span>
          <hr />
          <div class="columns is-gapless">
            <div class="column">Ação</div>
            <div class="column">Total</div>
          </div>
          <div
            style="overflow: auto"
            class="columns is-gapless notification is-link is-light"
            v-for="(track, idx) in tracking.group"
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
  }
};
</script>

<style>
</style>