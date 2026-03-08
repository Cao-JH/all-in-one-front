import './assets/main.css'
import '@/assets/icons/iconfont/iconfont.js'
import './styles/_variables.scss';

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
