<template>
  <div class="uk-margin" uk-margin style="width: 100%">
    <div uk-form-custom="target: true">
      <input
        style="width: 455px"
        class="uk-input uk-form-width-medium"
        v-model="initialcharacter"
        type="text"
        placeholder="EX: A | A100 | A20"
      />
    </div>

    <div uk-form-custom="target: true">
      <button
        class="uk-form-width-medium uk-button uk-button-primary"
        type="buttom"
        @click="blipAlterId"
      >Alterar</button>
    </div>
    <div v-if="notify.show" style="background-color: #06E4D1">
      <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
        <p>{{notify.message}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      initialcharacter: "",
      notify: {
        color: "",
        title: "Mensagem",
        message: "",
        show: false
      }
    };
  },
  methods: {
    blipAlterId() {
      const initialcharacter = this.initialcharacter;
      parent.postMessage(
        { pluginMessage: { type: "blipAlterId", initialcharacter } },
        "*"
      );
      this.initialcharacter = "";
      this.alert();
    },
    alert() {
      this.notify.color = "#06E4D1";
      this.notify.title = "Mensagem";
      this.notify.message = "Concluído";
      this.notify.show = true;
      const interval = setInterval(() => {
        this.notify.show = false;
        clearInterval(interval);
      }, 2000);
    }
  }
};
</script>