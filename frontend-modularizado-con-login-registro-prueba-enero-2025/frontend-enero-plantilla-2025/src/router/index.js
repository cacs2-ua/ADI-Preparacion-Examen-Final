import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase/config/firebaseConfig.js'

// Importa las vistas desde la carpeta `views`
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

// Cita.vue se suele mantener en `components`, pero su ruta es correcta
import Cita from '@/components/Cita.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      // Opcional: si estás logueado, que no te deje volver al login
      beforeEnter: (to, from, next) => {
        const currentUser = auth.currentUser
        if (currentUser) {
          next('/citas')
        } else {
          next()
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      // Opcional: si estás logueado, que no te deje volver al register
      beforeEnter: (to, from, next) => {
        const currentUser = auth.currentUser
        if (currentUser) {
          next('/citas')
        } else {
          next()
        }
      }
    },
    {
      path: '/citas',
      name: 'citas',
      component: Cita,
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/login'
    }
  ]
})

// GUARD GLOBAL PARA PROTEGER RUTAS
router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser
  if (to.meta.requiresAuth && !currentUser) {
    // Si la ruta requiere autenticación y no hay usuario logueado, redirige a login
    next('/login')
  } else {
    next()
  }
})

export default router
