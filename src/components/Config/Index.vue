<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <span class="tag is-dark">Configurações</span>
    </nav>
    <div class="box">
      <div class="field has-addons">
        <label class="label">Chave de autorização</label>
        <div class="control" style="width: 100%">
          <input class="input is-success" type="password" placeholder="Key" value v-model="token" />
        </div>
        <div class="control">
          <button class="button is-small is-link" @click="save">{{btnText}}</button>
        </div>
      </div>
    </div>

    <div class="notification is-primary" v-if="notify.show">
      <button class="delete" @click="notify.show = false"></button>
      {{notify.message}}
    </div>
  </div>
</template>

<script>
import Contants from "../../util/contants";
export default {
  data() {
    return {
      activeUser: null,
      token: "",
      btnText: "Salvar",
      textDisable: false,
      notify: {
        message: "",
        show: false
      }
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
    startup() {
      let self = this;
      this.getStorage();
      window.onmessage = async event => {
        const message = event.data.pluginMessage;
        const msgType = message.pluginMessage.type;
        if (msgType == Contants.POSTMESSAGER_RESOLVE_STORAGE) {
          self.token = message.pluginMessage.data;
        }

        if (msgType == Contants.POSTMESSAGER_RESOLVE_ACTIVE_USER) {
          self.activeUser = message.pluginMessage.user;
        }
      };
    },

    save() {
      const token = this.token;
      parent.postMessage(
        {
          pluginMessage: {
            type: Contants.POSTMESSAGER_SET_STORAGE,
            data: { key: "token", value: token }
          }
        },
        "*"
      );
      this.getStorage();
      this.initialcharacter = "";
      this.notify.message = "Concluído";
      this.notify.show = true;
    }
  },
  mounted() {
    this.startup();
  }
};
</script>

<style>
</style>