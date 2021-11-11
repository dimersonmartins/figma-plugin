<template>
  <div>
    <TabComponent />
  </div>
</template>

<script>
import "./figma-ui/js/selectMenu";
import "./figma-ui/js/iconInput";
import "./figma-ui/js/disclosure";
import TabComponent from "./components/tab.vue";

export default {
  components: {
    TabComponent
  },
  data() {
    return {};
  },
  mounted() {
    window.selectMenu.init();
    window.iconInput.init();
    window.disclosure.init();
  },
  methods: {}
};
</script>

<style lang='scss'>
@import "./figma-ui/figma-plugin-ds";
</style>