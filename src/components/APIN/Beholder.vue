<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <span class="tag is-dark">APIN/AIC - Beholder</span>
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
        <button :class="btnClasstype" @click="blipTracking">{{btnText}}</button>
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
                    <td nowrap>{{row.extras["#previousStateName"]}}</td>
                    <td nowrap>{{row.extras["#stateName"]}}</td>
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
      removeList: [],
      tempList: [],
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
    blipTracking() {
      if (!this.btnStart) {
        this.btnText = "Parar";
        this.btnClasstype = "button is-small is-danger";
        this.btnStart = true;
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
    uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
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
    compareElements(listToCompare, el2) {
      return listToCompare.find(
        el1 =>
          JSON.stringify(el1).replace(" ", "") ===
          JSON.stringify(el2).replace(" ", "")
      );
    },
    async updateTrack(track) {
      let index = this.removeList.findIndex(
        el => el.category == track.category
      );
      console.log("track", JSON.stringify(track));
      console.log("Before", JSON.stringify(this.removeList[index]));
      this.removeList[index].count = track.count;
      console.log("After", JSON.stringify(this.removeList[index]));
    },
    isDuplicate(listToCompare, track) {
      return listToCompare.some(
        el =>
          el.category == track.category &&
          el.action == track.action &&
          el.count == track.count
      );
    },
    async removeDuplicate() {
      return new Promise((resolve, reject) => {
        this.gridContent = this.gridContent.reduce((list, track) => {
          const match = list.find(
            item =>
              item.category === track.category &&
              item.action === track.action &&
              item.storageDate === track.storageDate
          );
          if (!match) {
            return list.concat([track]);
          } else {
            return list;
          }
        }, []);
        resolve();
      });
    },
    async delay(time) {
      return await new Promise(resolve => setTimeout(resolve, time));
    },
    async getTrackDetails(track) {
      const idRequest = this.uuidv4();

      console.log("getTrackDetails", idRequest);
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
          const trakcWithExtras = lastTrack.data.resource.items;
          if (trakcWithExtras.length == 0) {
            this.removeList.push(track);
          }

          for (let index = 0; index < trakcWithExtras.length; index++) {
            const element = trakcWithExtras[index];
            element["count"] = track.count;
            this.gridContent.push(element);
            this.removeList.push(element);
            this.updateTrack(track);
          }
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
                  console.log(this.isDuplicate(this.tempList, track));
                  if (!this.isDuplicate(this.tempList, track)) {
                    await this.getTrackDetails(track);
                    this.sortList();
                    this.tempList.push(track);
                  }
                }
              }
            }
          }
        }
        console.log("start delay");
        await this.delay(2000);
        console.log("end delay");
        await this.removeDuplicate();
        await this.getEvents(listOfTrackings);
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
        if (mesgType == Contants.POSTMESSAGER_RESOLVE_STORAGE) {
          self.keyAuthorize = message.pluginMessage.data;
        } else {
          const listOfTrackings = message.pluginMessage.trackings;
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
    }
  },
  watch: {}
};
</script>