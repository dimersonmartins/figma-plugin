<template>
  <div class="uk-margin" uk-margin>
    <div uk-form-custom="target: true">
      <input
        class="uk-input uk-form-width-medium"
        v-model="initialcharacter"
        type="text"
        placeholder="Ex: A | A100 | A20"
      />
    </div>

    <div uk-form-custom="target: true">
      <button
        class="uk-form-width-medium uk-button uk-button-primary"
        type="buttom"
        @click="blipAlterId"
      >Alterar</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      initialcharacter: ""
    };
  },
  methods: {
    blipAlterId() {
      const initialcharacter = this.initialcharacter;
      parent.postMessage(
        { pluginMessage: { type: "blipAlterId", initialcharacter } },
        "*"
      );
    }
  }
};
</script>