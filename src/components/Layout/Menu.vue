<template>
  <div class="uk-child-width-1-2@s" uk-grid>
    <div v-for="(row, index) in options" :key="index">
      <Card :data="row" />
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
export default {
  components: {
    Card
  },
  data() {
    return {
      options: [
        {
          title: "APIN",
          image: "blipinhoNerd.png",
          options: [
            {
              text: "Análise",
              router: "/analiticys"
            },
            {
              text: "Beholder",
              router: "/beholder"
            }
          ]
        },
        {
          title: "UX",
          image: "blipinhoApaixonado.png",
          options: [
            {
              text: "Identificadores",
              router: "/identity"
            }
          ]
        },
        // {
        //   title: "DEV",
        //   image: "blipinhoOMelhor.png",
        //   options: [
        //     {
        //       text: "Inspecionar Elemento",
        //       router: "/inspect"
        //     }
        //   ]
        // },
        {
          title: "Configurações",
          image: "blipinhoWorker.png",
          options: [
            {
              text: "Abrir",
              router: "/config"
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
</style>