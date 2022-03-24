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

    <nav class="breadcrumb" aria-label="breadcrumbs">
      <span class="tag is-dark">Variáveis de configuração</span>
    </nav>
    <div class="box">
      <div class="field has-addons">
        <label class="label">Variáveis</label>
        <div class="control" style="width: 49%">
          <input
            class="input is-success"
            type="text"
            placeholder="Variável"
            value
            v-model="variableToReplace.key"
          />
        </div>
        <div class="control" style="width: 2%"></div>
        <div class="control" style="width: 49%">
          <input
            class="input is-success"
            type="text"
            placeholder="Conteúdo"
            value
            v-model="variableToReplace.value"
          />
        </div>
        <div class="control">
          <button class="button is-small is-link" @click="addVariables">Adicionar</button>
        </div>
      </div>
      <div class="table-container" v-if="listOfVariables.length > 0">
        <table class="table is-bordered" style="width: 100%">
          <thead>
            <tr>
              <th>Variável</th>
              <th>Conteúdo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in listOfVariables" :key="index">
              <td nowrap>{{row.key}}</td>
              <td nowrap>{{row.value}}</td>
              <td nowrap>
                <button class="button is-danger is-small" @click="removeVariables(row)">Deletar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
      listOfVariables: [],
      variableToReplace: {
        key: null,
        value: null
      },
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
      parent.postMessage(
        {
          pluginMessage: {
            type: Contants.POSTMESSAGER_GET_STORAGE,
            data: { key: "variables" }
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
        if (msgType == Contants.POSTMESSAGER_RESOLVE_TOKEN_STORAGE) {
          self.token = message.pluginMessage.data;
        }
        if (msgType == Contants.POSTMESSAGER_RESOLVE_VARIABLES_STORAGE) {
          self.listOfVariables = JSON.parse(message.pluginMessage.data);
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
      this.notify.message = "Chave de autorização salva com sucesso!";
      this.notify.show = true;
    },
    setVariables(listOfVariables) {
      parent.postMessage(
        {
          pluginMessage: {
            type: Contants.POSTMESSAGER_SET_STORAGE,
            data: { key: "variables", value: JSON.stringify(listOfVariables) }
          }
        },
        "*"
      );
      this.getStorage();
    },
    addVariables() {
      this.getStorage();
      this.listOfVariables.push(this.variableToReplace);
      this.setVariables(this.listOfVariables);
    },
    removeVariables(row) {
      this.getStorage();
      this.listOfVariables.splice(this.listOfVariables.indexOf(row), 1);
      this.setVariables(this.listOfVariables);
    }
  },
  mounted() {
    this.startup();
  }
};
</script>

<style>
</style>