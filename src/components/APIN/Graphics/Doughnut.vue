<template>
  <div>
    <div class="columns is-gapless" v-for="(tracking, index) in gridContent" :key="index">
      <div class="column"></div>
      <div class="column is-four-fifths" v-if="tracking.group">
        <div class="box">
          <DoughnutChart :group="tracking.group" :category="tracking.group[0].category" />
        </div>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
import DoughnutChart from "./DoughnutChart";
export default {
  components: {
    DoughnutChart
  },
  props: {
    gridContent: { type: Array }
  },
  mounted() {}
};
</script>

<style>
</style>