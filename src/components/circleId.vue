<template>
  <div>
    <li>
      <input v-model="initialcharacter" class="uk-input" type="text" placeholder="Letra inicial" />
      <br />
      <br />
      <button class="uk-button uk-button-primary" @click="blipAlterId">Ajustar</button>
      <button class="uk-button uk-button-danger">Cancelar</button>
    </li>
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