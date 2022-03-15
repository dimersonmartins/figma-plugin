<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#" @click="$router.push('/')">
        <img src="../../assets/images/icone.png" width="28" height="28" />
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style>
.clearLink {
  text-decoration: none;
}
</style>