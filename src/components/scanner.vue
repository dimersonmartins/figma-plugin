<template>
  <div>
    <button class="uk-button uk-button-primary" @click="scanner">Scanner</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {
    scanner() {
      parent.postMessage({ pluginMessage: { type: "scanner" } }, "*");
    }
  }
};
</script>