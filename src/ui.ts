import Vue from 'vue';
import App from './components/Index.vue';
import store from './store/index';
import router from './routes/index';

Vue.prototype.$Notify = function (message, show) {
  if (show) {
    return `<div>
    <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
      <h3 class="uk-card-title">Mensagem</h3>
      <p>
        ${message}
      </p>
    </div>
  </div>`
  } else {
    return ''
  }

}

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
