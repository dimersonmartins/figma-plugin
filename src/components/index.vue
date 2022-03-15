<template>
  <div>
    <Navbar />
    <div style="padding: 50px">
      <router-view />
    </div>
  </div>
</template>
<script>
import "../assets/theme/uikit/js/uikit-icons";
import "../assets/theme/uikit/js/uikit";
import "../assets/figma-ui/js/selectMenu";
import "../assets/figma-ui/js/iconInput";
import "../assets/figma-ui/js/disclosure";
import Navbar from "../components/Layout/Navbar.vue";
export default {
  components: {
    Navbar
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
@import "~bulma/css/bulma.css";
@import "../assets/figma-ui/figma-plugin-ds";
@import "../assets/theme/uikit/css/uikit-rtl.css";
@import "../assets/theme/uikit/css/uikit-rtl.min.css";
@import "../assets/theme/uikit/css/uikit.css";
@import "../assets/theme/uikit/css/uikit.min.css";
</style>