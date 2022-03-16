<template>
  <div>
    <div class="box">
      <div class="columns">
        <div class="column is-four-fifths">
          <h2 class="subtitle">Entradas inesperadas</h2>
        </div>
        <div class="column"></div>
        <div class="column">
          <button class="button is-small is-success" @click="submit">Consultar</button>
        </div>
      </div>
      <div class="columns is-gapless" v-for="(tracking, index) in gridContent" :key="index">
        <div class="column"></div>
        <div class="column is-four-fifths" v-if="tracking.group">
          <div class="box">
            <span class="tag is-dark">{{tracking.group[0].block}}</span>
            <span class="tag is-info">{{tracking.group[0].category}}</span>
            <hr />
            <div class="columns is-gapless">
              <div class="column">Ação</div>
              <div class="column">Total</div>
            </div>
            <div
              style="overflow: auto"
              class="columns is-gapless notification is-link is-light"
              v-for="(track, idx) in tracking.group"
              :key="idx"
            >
              <div class="column">{{track.action}}</div>
              <div class="column">{{track.count}}</div>
            </div>
          </div>
        </div>
        <div class="column"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Contants from "../../util/contants";
import blipapi from "../../services/blipapi";
export default {
  data() {
    return {
      dataInicio: "",
      dataFim: "",
      gridGroupContent: [],
      keyAuthorize: ""
    };
  },
  props: {
    gridContent: { type: Array }
  },
  methods: {
    getStorage() {
      parent.postMessage(
        {
          pluginMessage: {
            type: Contants.POSTMESSAGER_GET_STORAGE,
            data: { key: "token" }
          }
        },
        "*"
      );
    },
    submit() {
      parent.postMessage(
        { pluginMessage: { type: Contants.POSTMESSAGER_ALL_TRACKINGS } },
        "*"
      );
    }
  },
  async mounted() {
    this.getStorage();
    let self = this;
    window.onmessage = async event => {
      const message = event.data.pluginMessage;
      if (message) {
        const msgType = message.pluginMessage.type;
        if (msgType == Contants.POSTMESSAGER_RESOLVE_STORAGE) {
          self.keyAuthorize = message.pluginMessage.data;
        }
        if (msgType == Contants.po) {
          self.keyAuthorize = message.pluginMessage.data;
        }
        if (msgType == Contants.POSTMESSAGER_RESOLVE_TRACKINGS) {
          const list = message.pluginMessage.trackings;
          for (let index = 0; index < list.length; index++) {
            const category = list[index];
            if (category.includes("inesperado")) {
              let resp = await blipapi.RangeDateTracking(
                self.keyAuthorize,
                category,
                self.rageDate
              );
              const items = resp.data.resource.items;
            }
          }
        }
      }
    };
  },
  computed: {
    rageDate() {
      if (this.dataInicio.includes("/") && this.dataFim.includes("/")) {
        let dti = this.dataInicio.split("/");
        let dtf = this.dataFim.split("/");
        return (
          "?startDate=" +
          dti[2] +
          "-" +
          dti[1] +
          "-" +
          dti[0] +
          "&endDate=" +
          dtf[2] +
          "-" +
          dtf[1] +
          "-" +
          dtf[0]
        );
      } else {
        return "?startDate=" + this.dataInicio + "&endDate=" + this.dataFim;
      }
    }
  }
};
</script>

<style>
</style>