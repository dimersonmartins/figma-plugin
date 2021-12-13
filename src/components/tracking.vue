<template>
  <div>
    <div class="uk-margin" uk-margin>
      <div uk-form-custom="target: true">
        <input
          class="uk-input uk-form-width-medium"
          v-model="dataInicio"
          type="date"
          placeholder="Data inicial"
        />
      </div>
      <div uk-form-custom="target: true">
        <input
          class="uk-input uk-form-width-medium"
          v-model="dataFim"
          type="date"
          placeholder="Data final"
        />
      </div>
      <div uk-form-custom="target: true">
        <button
          class="uk-form-width-medium uk-button uk-button-primary"
          type="buttom"
          @click="blipTracking"
        >Pesquisar</button>
      </div>
    </div>
    <table class="uk-table uk-table-small uk-table-divider">
      <thead>
        <tr>
          <th>Data</th>
          <th>Categoria</th>
          <th>Ação</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tracking in gridContent" :key="tracking.storageDate">
          <td>{{formatDate(tracking.storageDate)}}</td>
          <td>{{tracking.category}}</td>
          <td>{{tracking.action}}</td>
          <td>{{tracking.count}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import blipapi from "../services/blipapi";
export default {
  data() {
    return {
      dataInicio: "",
      dataFim: "",
      gridContent: []
    };
  },
  methods: {
    blipTracking() {
      parent.postMessage({ pluginMessage: { type: "getAllTrackings" } }, "*");
    },
    formatDate(date) {
      date = date.replace("T03:00:00.000Z", "");
      let dt = date.split("-");
      return dt[2] + "/" + dt[1] + "/" + dt[0];
    }
  },
  mounted() {
    let self = this;
    window.onmessage = async event => {
      const message = event.data.pluginMessage;
      if (message) {
        self.gridContent = [];
        self.$store.commit("addTrackings", message.pluginMessage.trackings);
        for (
          let index = 0;
          index < message.pluginMessage.trackings.length;
          index++
        ) {
          const category = message.pluginMessage.trackings[index];
          let resp = await blipapi.Tracking(category, self.rageDate);

          resp.data.resource.items.forEach(element => {
            self.gridContent.push(element);
          });
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