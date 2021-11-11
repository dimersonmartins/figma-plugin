<template>
  <div>
    <div class="uk-child-width-1-2@s" uk-grid>
      <div>
        <div uk-grid>
          <div class="uk-width-auto@m uk-flex-last@m">
            <ul
              class="uk-tab-right"
              uk-tab="connect: #component-tab-right; animation: uk-animation-fade"
            >
              <li>
                <a href="#">Blip ID</a>
              </li>
              <li>
                <a href="#">Blip Tracking</a>
              </li>
              <li>
                <a href="#">Blip Card</a>
              </li>
            </ul>
          </div>
          <div class="uk-width-expand@m">
            <ul id="component-tab-right" class="uk-switcher">
              <CircleId />
              <li>Blip Tracking</li>
              <li>Blip Card</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CircleId from "./circleId.vue";
export default {
  components: {
    CircleId
  },
  data() {
    return {};
  },
  methods: {}
};
</script>