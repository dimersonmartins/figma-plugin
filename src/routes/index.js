import Vue from 'vue'
import VueRouter from 'vue-router'
import ChangeIdentity from '../components/UX/ChangeIdentity.vue'
import Analiticys from '../components/APIN/Analiticys.vue'
import Beholder from '../components/APIN/Beholder.vue'
import UnexpectedHeatMap from '../components/APIN/UnexpectedHeatMap.vue'
import Inspect from '../components/Developer/Inspect.vue'
import Config from '../components/Config/Index.vue'
import Menu from '../components/Layout/Menu.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Menu },
    { path: '/analiticys', component: Analiticys },
    { path: '/beholder', component: Beholder },
    { path: '/unexpected-heatmap', component: UnexpectedHeatMap },
    { path: '/inspect', component: Inspect },
    { path: '/identity', component: ChangeIdentity },
    { path: '/config', component: Config },
]

export default new VueRouter({ routes });