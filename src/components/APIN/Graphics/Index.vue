<template>
  <div>
    <div class="columns is-gapless" v-for="(tracking, index) in gridContent" :key="index">
      <div class="column"></div>
      <div class="column is-four-fifths" v-if="tracking.group">
        <div class="box">
          <span class="tag is-dark">{{tracking.group[0].category}}</span>
          <span class="tag is-info">{{tracking.group.length}}</span>
          <div class="select is-small">
            <select v-model="selectedGraphicsTypeId" @change="setGraphicsType(tracking)">
              <option v-for="row in graphicsTypes" :key="row.id" :value="row.id">{{row.name}}</option>
            </select>
          </div>
          <hr />
          <GraphicsGroup
            :gridContent="tracking.group"
            v-if="selectedGraphicsTypeId == 0 || selectedGraphicsTypeId == 1"
          />
          <!-- <GraphicsLine :gridContent="tracking.group" v-if="selectedGraphicsType == 3" />
          <GraphicsPizza :gridContent="tracking.group" v-if="selectedGraphicsType == 4" />
          <GraphicsBar :gridContent="tracking.group" v-if="selectedGraphicsType == 5" />-->
          <!-- <GraphicsDoughnut :gridContent="tracking.group" v-if="selectedGraphicsType == 5" /> -->
        </div>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
import GraphicsGroup from "./Group.vue";
import GraphicsList from "./List.vue";
import GraphicsPizza from "./Pizza.vue";
import GraphicsLine from "./Line.vue";
import GraphicsBar from "./Bar.vue";
import GraphicsDoughnut from "./Doughnut.vue";
export default {
  components: {
    GraphicsGroup,
    GraphicsList,
    GraphicsPizza,
    GraphicsLine,
    GraphicsBar,
    GraphicsDoughnut
  },
  data() {
    return {
      selectedGraphicsTypeId: 0,
      selectedGraphicsType: {
        id: 0,
        track: {}
      }
    };
  },
  props: {
    gridContent: { type: Array }
  },
  computed: {
    setGraphicsType(row) {
      this.selectedGraphicsType.id = this.selectedGraphicsTypeId;
      this.selectedGraphicsType.row = row;
      console.log(this.selectedGraphicsType);
    },
    graphicsTypes() {
      return this.$store.state.graphicsTypes;
    }
  }
};
</script>

<style>
</style>