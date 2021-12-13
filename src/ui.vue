<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>
<script>
import "./ukit/js/uikit-icons";
import "./ukit/js/uikit";
import "./figma-ui/js/selectMenu";
import "./figma-ui/js/iconInput";
import "./figma-ui/js/disclosure";
import NavBar from "./components/navbar.vue";
export default {
  components: {
    NavBar
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
@import "./ukit/css/uikit-rtl.css";
@import "./ukit/css/uikit-rtl.min.css";
@import "./ukit/css/uikit.css";
@import "./ukit/css/uikit.min.css";
</style>