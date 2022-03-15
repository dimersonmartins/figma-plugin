import Vue from 'vue'
import VueRouter from 'vue-router'
import Ux from './components/UX/CircleId.vue'
import Tracking from './components/APIN/Tracking.vue'
import WatchTracking from './components/APIN/WatchTracking.vue'
import Scanner from './components/Developer/Scanner.vue'
import Configuracao from './components/Config/Index.vue'
import Menu from './components/Layout/Menu.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Menu },
    { path: '/trackings', component: Tracking },
    { path: '/watch-trackings', component: WatchTracking },
    { path: '/dev', component: Scanner },
    { path: '/ux', component: Ux },
    { path: '/configuracao', component: Configuracao },
]

export default new VueRouter({ routes });