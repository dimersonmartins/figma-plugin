<template>
  <nav class="uk-navbar-container uk-margin" uk-navbar="mode: click">
    <div class="uk-navbar-left">
      <ul class="uk-navbar-nav">
        <li class="uk-active">
          <!-- <router-link to="/" class="clearLink">
            <a href="#" @click="selectBlip = 'UX'">UX</a>
          </router-link> -->
           <a href="#" @click="selectBlip = 'UX'" disable>UX</a>
          <!-- <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li>
                <router-link to="/">IDs</router-link>
              </li>
              <li class="uk-nav-divider"></li>
              <li>
                <router-link to="/">Gerar Sumário</router-link>
              </li>
            </ul>
          </div>-->
        </li>
        <!-- <li>
          <router-link to="/trackins" class="clearLink">
            <a href="#" @click="selectBlip = 'APIN'">Tracking</a>
          </router-link>
           <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li>
                <router-link to="/trackins">Consultar Trackings</router-link>
              </li>
              <li class="uk-nav-divider"></li>
              <li>
                <router-link to="/">Testar Trackings</router-link>
              </li>
            </ul>
          </div> 
        </li> -->
        <!-- <li>
          <a href="#" @click="selectBlip = 'DEV'">DEV</a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li>
                <router-link to="/trackins">Gerar fluxo</router-link>
              </li>
              <li class="uk-nav-divider"></li>
              <li>
                <router-link to="/">Gerar bloco</router-link>
              </li>
              <li class="uk-nav-divider"></li>
              <li>
                <router-link to="/">Trackear bloco</router-link>
              </li>
            </ul>
          </div>
        </li>-->
      </ul>
    </div>
    <div class="uk-navbar-right">
      <ul class="uk-navbar-nav">
        <li>
          <a href="#">
            <img
              v-if="selectBlip == 'UX'"
              src=".././assets/images/blipinhoApaixonado.png"
              width="40"
              height="40"
            />
            <img
              v-if="selectBlip == 'APIN'"
              src=".././assets/images/blipinhoPiscando.png"
              width="40"
              height="40"
            />
            <img
              v-if="selectBlip == 'DEV'"
              src=".././assets/images/blipinhoNerd.png"
              width="40"
              height="40"
            />
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      sourceBlip: ".././assets/images/blipLogo.png",
      selectBlip: "UX",
      sortBlipinhos: [
        ".././assets/images/blipLogo.png",
        ".././assets/images/blipinhoSorrindo.png",
        ".././assets/images/blipinhoSorrindo2.png",
        ".././assets/images/blipinhoNerd.png",
        ".././assets/images/blipinhoPiscando.png",
        ".././assets/images/blipinhoOMelhor.png",
        ".././assets/images/blipinhorsrsrsrsrss.png",
        ".././assets/images/blipinhoTimido.png"
      ]
    };
  },
  methods: {
    sortBlip() {
      this.sourceBlip = this.sortBlipinhos[Math.floor(Math.random() * 8)];
    }
  },
  mounted() {
    this.sortBlip();
    console.log(this.sourceBlip);
  }
};
</script>

<style>
.clearLink {
  text-decoration: none;
}
</style>