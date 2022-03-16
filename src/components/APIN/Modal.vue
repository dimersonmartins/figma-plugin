<template>
  <div>
    <a class="uk-button uk-button-secondary uk-button-small" :href="'#'+modalId" uk-toggle>Extras</a>

    <div :id="modalId" uk-modal>
      <div class="uk-modal-dialog">
        <div class="uk-modal-header">
          <h2 class="uk-modal-title">Extras</h2>
        </div>

        <div class="uk-modal-body" uk-overflow-auto>
          <table class="uk-table uk-table-small uk-table-divider">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value, name) in extras" :key="name">
                <td nowrap>{{name}}</td>
                <td nowrap>{{value}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="uk-modal-footer uk-text-right">
          <button class="uk-button uk-button-secondary uk-modal-close" type="button">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalId: { type: String },
    extras: { type: Object }
  }
};
</script>

<style>
</style>