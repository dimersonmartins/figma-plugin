<template>
  <div>
    <div class="uk-margin" uk-margin>
      <div uk-form-custom="target: true">
        <button
          class="uk-form-width-medium uk-button uk-button-primary"
          type="buttom"
          @click="blipTracking"
        >Começar</button>
      </div>
    </div>

    <article class="uk-comment uk-comment-primary">
      Carteira recomendada agora nao exibicao
      <table class="uk-table">
        <thead>
          <tr>
            <th>Bloco</th>
            <th>Ação</th>
            <th>Data</th>
            <th>Extras</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td nowrap>CR.1.0.1 - Sobre carteira recomendada</td>
            <td nowrap>Carteira recomendada</td>
            <td nowrap>01/02/2022</td>
            <td nowrap>
              <Modal />
            </td>
            <td nowrap>

            </td>
            <td nowrap>
              
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import Contants from "../../contants";
import blipapi from "../../services/blipapi";
export default {
  components: {
    Modal
  },
  data() {
    return {
      dataInicio: "",
      dataFim: "",
      gridContent: []
    };
  },
  methods: {
    blipTracking() {
      parent.postMessage(
        { pluginMessage: { type: Contants.POSTMESSAGER_ALL_TRACKINGS } },
        "*"
      );
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
        self.$store.commit(
          Contants.COMMIT_SET_SELETED_TRACKINGS,
          message.pluginMessage.trackings
        );
        for (let index = 0; index < this.listOfTrackings.length; index++) {
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
    listOfTrackings() {
      return this.$store.state.trackings;
    },
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