<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <span class="tag is-dark">Desenvolver - Inspecionar</span>
    </nav>
    <div class="box">
      <div class="columns is-gapless">
        <div class="column is-four-fifths">
          <button class="button is-dark" @click="inspect">Inspecionar</button>
        </div>
      </div>
    </div>

    <div class="box">
      <div class="table-container">
        <table class="table is-hoverable">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>X</th>
              <th>Y</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in elements" :key="index">
              <td nowrap>{{row.name}}</td>
              <td nowrap>{{row.type}}</td>
              <td nowrap>{{row.positionX}}</td>
              <td nowrap>{{row.positionY}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Contants from "../../util/contants";
export default {
  data() {
    return {
      elements: {}
    };
  },
  methods: {
    getElements() {
      parent.postMessage(
        {
          pluginMessage: {
            type: Contants.POSTMESSAGER_GET_INSPECT_ELEMENTS,
            data: { key: "token" }
          }
        },
        "*"
      );
    },
    inspect() {
      parent.postMessage(
        { pluginMessage: { type: Contants.POSTMESSAGER_INSPECT_ELEMENTS } },
        "*"
      );
      this.getElements();
    }
  },
  mounted() {
    let self = this;
    window.onmessage = async event => {
      const message = event.data.pluginMessage;
      if (message) {
        const mesgType = message.pluginMessage.type;
        if (mesgType == Contants.POSTMESSAGER_GET_INSPECT_ELEMENTS) {
          self.elements = message.pluginMessage.elements;
        }
      }
    };
  }
};
</script>