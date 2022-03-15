<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <span class="tag is-dark">UX - Identificadores</span>
    </nav>
    <div class="box">
      <div class="columns is-gapless">
        <div class="column"></div>
        <div class="column">
          <div class="field has-addons">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="EX: A | A100 | A20"
                v-model="initialcharacter"
              />
            </div>
            <div class="control">
              <a class="button is-small is-info" @click="changeId">Confirmar</a>
            </div>
          </div>
        </div>
        <div class="column"></div>
      </div>
    </div>

    <div class="notification is-primary" v-if="notify.show">
      <button class="delete" @click="notify.show = false"></button>
      {{notify.message}}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Contants from "../../util/contants";
export default {
  data() {
    return {
      initialcharacter: "",
      notify: {
        message: "",
        show: false
      }
    };
  },
  methods: {
    changeId() {
      const initialcharacter = this.initialcharacter;
      parent.postMessage(
        {
          pluginMessage: {
            type: Contants.POSTMESSAGER_CHANGE_ID,
            initialcharacter
          }
        },
        "*"
      );
      this.initialcharacter = "";
      this.notify.message = "Concluído";
      this.notify.show = true;
    }
  }
};
</script>