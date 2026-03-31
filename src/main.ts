import './styles/reset.css'
import './assets/main.css'
import '@/assets/icons/iconfont/iconfont.js'
import './styles/_variables.scss'
import 'primeicons/primeicons.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { primeVuePreset } from '@/theme/primevue-preset'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router).use(PrimeVue, {
  theme: {
    preset: primeVuePreset,
  },
})

app.mount('#app')
