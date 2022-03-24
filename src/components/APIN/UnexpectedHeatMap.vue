<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <div class="columns">
        <div class="column is-four-fifths">
          <span class="tag is-dark">APIN - Entradas inesperadas</span>
        </div>
      </div>
    </nav>
    <div class="box">
      <div class="columns">
        <div class="column"></div>
        <div class="column is-four-fifths">
          <div class="field has-addons">
            <div class="control">
              <input class="input" type="date" v-model="dataInicio" placeholder="Data inicial" />
            </div>
            <div class="control">
              <input class="input" v-model="dataFim" type="date" placeholder="Data final" />
            </div>
            <div class="control">
              <button class="button is-small is-success" @click="submit">Consultar</button>
            </div>
          </div>
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
      parent.postMessage(
        { pluginMessage: { type: Contants.POSTMESSAGER_ALL_TRACKINGS } },
        "*"
      );
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
      const lastTrack = await blipapi.ExtrasTracking(
        this.keyAuthorize,
        track.category,
        track.action,
        skip,
        this.rageDate
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
    async getEvents(listOfTrackings) {
      try {
        for (let index = 0; index < listOfTrackings.length; index++) {
          const category = listOfTrackings[index];
          const resp = await blipapi.RangeDateTracking(
            this.keyAuthorize,
            category,
            this.rageDate
          );
          console.log(JSON.stringify(resp));
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

        console.log(JSON.stringify(this.gridContent));
      } catch (error) {
        console.log(error);
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
        if (mesgType == Contants.POSTMESSAGER_RESOLVE_STORAGE) {
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