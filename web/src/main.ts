import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import WalletConnect from './components/WalletConnect.vue'


// Router
import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: WalletConnect },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
})

//createApp(App).mount('#app')
createApp(App).use(vuetify).use(router).mount('#app')
