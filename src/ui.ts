import Vue from 'vue';
import Vuex from 'vuex'
import App from './ui.vue';
import VueRouter from 'vue-router'
import Index from './components/circleId.vue'
import Tracking from './components/tracking.vue'
import Scanner from './components/scanner.vue'

Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  { path: '/', component: Index },
  { path: '/trackins', component: Tracking },
  { path: '/teste', component: Scanner },
]

const router = new VueRouter({ routes })

const store = new Vuex.Store({
  state: {
    trackings: []
  },
  mutations: {
    addTrackings(state, payload) {
      state.trackings = payload
    }
  }
})

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
