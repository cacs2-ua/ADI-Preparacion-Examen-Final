import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { onAuthStateChanged } from 'firebase/auth'

import App from './App.vue'
import router from './router'
import { auth } from '@/firebase/config/firebaseConfig'

// VARIABLE PARA CONTROLAR MONTAJE ÚNICO
let app = null

// ESPERAR A QUE FIREBASE DETERMINE EL ESTADO DE AUTENTICACIÓN
onAuthStateChanged(auth, (user) => {
  if (!app) {
    // Solo se monta la aplicación la primera vez
    app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.mount('#app')
  }
})
