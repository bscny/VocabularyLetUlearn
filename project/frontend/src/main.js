import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'


const app = createApp(App)
const pinia = createPinia();
app.use(router)
app.use(createPinia())
app.mount('#app')
