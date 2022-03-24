<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <span class="tag is-dark">APIN - Testes</span>
    </nav>
    <div class="columns">
      <div class="column"></div>
      <div class="column is-four-fifths">
        <div v-if="btnStart">
          {{logger}}
          <progress
            class="progress is-small is-warning"
            max="100"
            style="margin-top: 10px"
          >15%</progress>
        </div>
      </div>
      <div class="column">
        <button :class="btnClasstype" @click="submit">{{btnText}}</button>
      </div>
    </div>
    <br />
    <div v-if="gridContent.length > 0">
      <div class="box" style="overflow: auto" v-for="(row, index) in gridContent" :key="index">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <span class="tag is-dark">{{row.category}}</span>
              <span class="tag is-light">{{new Date(row.storageDate).toLocaleDateString()}}</span>
              <span class="tag is-light">{{new Date(row.storageDate).toLocaleTimeString()}}</span>
            </div>
            <div class="table-container">
              <table class="table is-bordered">
                <thead>
                  <tr>
                    <th>Bloco Anterior</th>
                    <th>Bloco Atual</th>
                    <th>Ação</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td nowrap v-if="row.isLoading">
                      <div class="skeleton skeleton-text" style="width: 30px; height: 30px"></div>
                    </td>
                    <td nowrap v-if="row.isLoading">
                      <div class="skeleton skeleton-text" style="width: 30px; height: 30px"></div>
                    </td>
                    <td nowrap v-if="!row.isLoading">{{row.extras["#stateName"]}}</td>
                    <td nowrap v-if="!row.isLoading">{{row.extras["#stateName"]}}</td>
                    <td nowrap>{{row.action}}</td>
                    <td nowrap>
                      <Modal :modalId="'modal-overflow'+index" :extras="row.extras" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div v-else class="box" style="text-align: center;">Vazio!</div>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import Contants from "../../util/contants";
import blipapi from "../../services/blipapi";
export default {
  components: {
    Modal
  },
  data() {
    return {
      dataInicio: "",
      dataFim: "",
      gridContent: [],
      isFirstInteraction: false,
      keyAuthorize: "",
      btnText: "Consultar",
      btnClasstype: "button is-small is-info",
      btnStart: false,
      logger: ""
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
    submit() {
      if (!this.btnStart) {
        this.btnText = "Parar";
        this.btnClasstype = "button is-small is-danger";
        this.btnStart = true;
        this.trayAgain();
        parent.postMessage(
          { pluginMessage: { type: Contants.POSTMESSAGER_ALL_TRACKINGS } },
          "*"
        );
      } else {
        this.btnText = "Consultar";
        this.btnClasstype = "button is-small is-info";
        this.btnStart = false;
      }
    },
    sortList() {
      this.gridContent = this.gridContent.sort((a, b) => {
        if (a.storageDate < b.storageDate) {
          return 1;
        }
        if (a.storageDate > b.storageDate) {
          return -1;
        }
        return 0;
      });
    },
    async delay(time) {
      return await new Promise(resolve => setTimeout(resolve, time));
    },
    async getTrackDetails(track) {
      const skip = 0;
      const rageDate = this.isFirstInteraction
        ? this.maxRageDate
        : this.rageDate;
      const lastTrack = await blipapi.ExtrasTracking(
        this.keyAuthorize,
        track.category,
        track.action,
        skip,
        rageDate
      );

      if (lastTrack.data.status == "success") {
        if (lastTrack.data.resource.hasOwnProperty("items")) {
          const trackWithExtras = lastTrack.data.resource.items;

          trackWithExtras.forEach(element => {
            const indexIsLoading = this.gridContent.findIndex(
              el =>
                el.category == element.category &&
                el.action == element.action &&
                el.isLoading == true
            );

            this.$set(this.gridContent, indexIsLoading, {
              isLoading: false,
              ...element
            });
          });
        }
      }
    },
    async trayAgain() {
      for (let index = 0; index < this.gridContent.length; index++) {
        const track = this.gridContent[index];
        if (track.isLoading) {
          await this.getTrackDetails(track);
          this.sortList();
        }
      }
    },
    async getEvents(listOfTrackings) {
      try {
        if (this.btnStart) {
          this.logger = "Consultando...";
          for (let index = 0; index < listOfTrackings.length; index++) {
            const category = listOfTrackings[index];
            const resp = await blipapi.UniqueTracking(
              this.keyAuthorize,
              category
            );

            const resource = resp.data.resource;
            if (resp.data.status == "success") {
              if (resource.hasOwnProperty("items")) {
                const tracks = resource.items;
                for (let idx = 0; idx < tracks.length; idx++) {
                  const track = tracks[idx];

                  const gridTrack = this.gridContent.filter(
                    el =>
                      el.category == track.category && el.action == track.action
                  );

                  const diff = track.count - gridTrack.length;

                  for (let index = 0; index < diff; index++) {
                    this.gridContent.push({
                      category: track.category,
                      action: track.action,
                      storageDate: Date.now(),
                      isLoading: true,
                      extras: {
                        "#previousStateName": "Carregando...",
                        "#stateName": "Carregando..."
                      }
                    });

                    this.sortList();
                    await this.getTrackDetails(track);
                    this.sortList();
                  }
                }
              }
            }
          }

          await this.delay(2000);
          this.isFirstInteraction = false;
          await this.getEvents(listOfTrackings);
        }
      } catch (error) {
        console.log(error);
        this.logger = "Ocorreu um erro!";
        this.btnText = "Tentar novamente";
        this.btnClasstype = "button is-small is-warning";
        this.btnStart = false;
      }
    }
  },
  async mounted() {
    let self = this;
    this.getStorage();
    window.onmessage = async event => {
      const message = event.data.pluginMessage;
      if (message) {
        const mesgType = message.pluginMessage.type;
        if (mesgType == Contants.POSTMESSAGER_RESOLVE_TOKEN_STORAGE) {
          self.keyAuthorize = message.pluginMessage.data;
        } else {
          const listOfTrackings = message.pluginMessage.trackings;
          self.isFirstInteraction = true;
          await self.getEvents(listOfTrackings);
        }
      }
    };
  },
  computed: {
    rageDate() {
      var today = new Date();
      const dtinicio = today.setMinutes(today.getMinutes() - 5);
      this.dataInicio = new Date(dtinicio).toISOString();
      const dtfim = today.setMinutes(today.getMinutes() + 30);
      this.dataFim = new Date(dtfim).toISOString();
      return "?startDate=" + this.dataInicio + "&endDate=" + this.dataFim;
    },
    maxRageDate() {
      var today = new Date();
      const dtinicio = today.setHours(today.getHours() - 1);
      this.dataInicio = new Date(dtinicio).toISOString();
      const dtfim = today.setHours(today.getHours() + 3);
      this.dataFim = new Date(dtfim).toISOString();
      return "?startDate=" + this.dataInicio + "&endDate=" + this.dataFim;
    }
  },
  watch: {}
};
</script>
<style scoped>
.skeleton {
  opacity: 0.7;
  animation: skeleton-loading 1s linear infinite alternate;
}

.skeleton-text {
  width: 100%;
  height: 0.5rem;
  margin-bottom: 0.25rem;
  border-radius: 0.125rem;
}

.skeleton-text:last-child {
  margin-bottom: 0;
  width: 80%;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 70%);
  }

  100% {
    background-color: hsl(200, 20%, 95%);
  }
}
</style>