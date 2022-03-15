<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <span class="tag is-dark">APIN/AIC - Análise</span>
    </nav>
    <div class="box">
      <div class="columns is-gapless">
        <div class="column"></div>
        <div class="column">
          <div class="field has-addons">
            <div class="control">
              <input class="input" type="date" v-model="dataInicio" placeholder="Data inicial" />
            </div>
            <div class="control">
              <input class="input" v-model="dataFim" type="date" placeholder="Data final" />
            </div>
            <div class="control">
              <a class="button is-small is-info" @click="blipTracking">Consultar</a>
            </div>
          </div>
        </div>
        <div class="column"></div>
      </div>
    </div>

    <div class="columns is-gapless" v-for="(tracking, index) in gridContent" :key="index">
      <div class="column"></div>
      <div class="column is-four-fifths">
        <div class="box">
          <span class="tag is-dark">{{tracking.group[0].category}}</span>
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
</template>

<script>
import Contants from "../../util/contants";
import blipapi from "../../services/blipapi";
export default {
  data() {
    return {
      dataInicio: "",
      dataFim: "",
      keyAuthorize: "",
      gridContent: []
    };
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

    blipTracking() {
      parent.postMessage(
        { pluginMessage: { type: Contants.POSTMESSAGER_ALL_TRACKINGS } },
        "*"
      );
    }
  },
  mounted() {
    this.getStorage();
    let self = this;
    window.onmessage = async event => {
      const message = event.data.pluginMessage;
      if (message) {
        const mesgType = message.pluginMessage.type;
        if (mesgType == Contants.POSTMESSAGER_RESOLVE_STORAGE) {
          self.keyAuthorize = message.pluginMessage.data;
        } else {
          self.gridContent = [];

          const listOfTrackings = message.pluginMessage.trackings;

          for (let index = 0; index < listOfTrackings.length; index++) {
            const category = message.pluginMessage.trackings[index];
            let resp = await blipapi.RangeDateTracking(
              self.keyAuthorize,
              category,
              self.rageDate
            );
            let track = {};
            let items = resp.data.resource.items;

            items.forEach(element => {
              if (track.hasOwnProperty(element.action)) {
                track[element.action] = track[element.action] + element.count;
              } else {
                track[element.action] = element.count;
              }
            });

            let listOfTrack = [];

            for (var prop in track) {
              let newTrack = items.find(el => el.action == prop);
              newTrack.count = track[prop];
              listOfTrack.push(newTrack);
            }

            const result = listOfTrack.reduce((r, a) => {
              r["group"] = r["group"] || [];
              r["group"].push(a);
              return r;
            }, {});
            self.gridContent.push(result);
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