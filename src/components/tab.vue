<template>
  <div>
    <div class="uk-child-width-1-2@s" uk-grid>
      <div class="uk-width-small@m">
        <ul class="uk-tab-left" uk-tab="connect: #component-tab-left; animation: uk-animation-fade">
          <li>
            <a href="#">ID</a>
          </li>
          <li>
            <a href="#">Tracking</a>
          </li>
          <li>
            <a href="#">Scanner</a>
          </li>
        </ul>
      </div>
      <div class="uk-width-expand@m">
        <ul id="component-tab-left" class="uk-switcher">
          <CircleId />
          <Tracking />
          <Scanner />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CircleId from "./circleId.vue";
import Tracking from "./tracking.vue";
import Scanner from "./scanner.vue";
export default {
  components: {
    CircleId,
    Tracking,
    Scanner,
  },
  data() {
    return {};
  },
  methods: {}
};
</script>