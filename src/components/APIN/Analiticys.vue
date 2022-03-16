<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <div class="columns">
        <div class="column is-four-fifths">
          <span class="tag is-dark">APIN - Análise</span>
        </div>
        <div class="column"></div>
        <div class="column"></div>
        <div class="column" v-if="gridGroupContent.length > 0">
          <button class="button is-small is-success" @click="generateFile">Exportar</button>
        </div>
      </div>
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
        <div class="column">
          <div class="select is-small">
            <select v-model="selectedGraphicsType">
              <option v-for="row in graphicsTypes" :key="row.id" :value="row.id">{{row.name}}</option>
            </select>
          </div>
        </div>
        <div class="column"></div>
      </div>
    </div>

    <GraphicsGroup
      :gridContent="gridGroupContent"
      v-if="selectedGraphicsType == 0 || selectedGraphicsType == 1"
    />
    <!-- <GraphicsList :gridContent="gridSimpleListContent" v-if="selectedGraphicsType == 2" /> -->
    <GraphicsLine :gridContent="gridGroupContent" v-if="selectedGraphicsType == 3" />
    <GraphicsPizza :gridContent="gridGroupContent" v-if="selectedGraphicsType == 4" />
    <GraphicsBar :gridContent="gridGroupContent" v-if="selectedGraphicsType == 5" />
    <GraphicsDoughnut :gridContent="gridGroupContent" v-if="selectedGraphicsType == 6" />
  </div>
</template>

<script>
import Contants from "../../util/contants";
import { Json2Csv } from "../../util/helpers.ts";
import blipapi from "../../services/blipapi";
import GraphicsGroup from "./Graphics/Group.vue";
import GraphicsList from "./Graphics/List.vue";
import GraphicsPizza from "./Graphics/Pizza.vue";
import GraphicsLine from "./Graphics/Line.vue";
import GraphicsBar from "./Graphics/Bar.vue";
import GraphicsDoughnut from "./Graphics/Doughnut.vue";
export default {
  components: {
    GraphicsGroup,
    GraphicsList,
    GraphicsPizza,
    GraphicsLine,
    GraphicsBar,
    GraphicsDoughnut
  },
  data() {
    return {
      dataInicio: "",
      dataFim: "",
      keyAuthorize: "",
      gridGroupContent: [],
      gridSimpleListContent: [],
      selectedGraphicsType: 0,
      gridToCsv: [],
      graphicsTypes: [
        {
          id: 0,
          name: "Visualizar em Gráficos"
        },
        {
          id: 1,
          name: "Grupos"
        },
        // {
        //   id: 2,
        //   name: "Lista"
        // },
        {
          id: 3,
          name: "Linha"
        },
        {
          id: 4,
          name: "Setor"
        },
        {
          id: 5,
          name: "Coluna"
        },
        {
          id: 6,
          name: "Rosquinha"
        }
      ]
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
    },
    processGroupTracks(items) {
      let track = {};
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

      this.gridGroupContent.push(result);
    },
    processToCsv() {
      this.gridToCsv = [];
      for (let i = 0; i < this.gridSimpleListContent.length; i++) {
        const list = this.gridSimpleListContent[i];
        for (let j = 0; j < list.length; j++) {
          const element = list[j];
          this.gridToCsv.push(element);
        }
      }
    },
    generateFile() {
      this.processToCsv();
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/csv;charset=utf-8," +
          encodeURIComponent(Json2Csv(this.gridToCsv))
      );
      element.setAttribute("download", "bliptoolkit-analitics.csv");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
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
          const listOfTrackings = message.pluginMessage.trackings;

          self.gridGroupContent = [];
          self.gridSimpleListContent = [];
          self.gridToCsv = [];

          for (let index = 0; index < listOfTrackings.length; index++) {
            const category = message.pluginMessage.trackings[index];
            let resp = await blipapi.RangeDateTracking(
              self.keyAuthorize,
              category,
              self.rageDate
            );

            const items = resp.data.resource.items;
            self.processGroupTracks(items);
            self.gridSimpleListContent.push(items);
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
  },
  watch: {}
};
</script>