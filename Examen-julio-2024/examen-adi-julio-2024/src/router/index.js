import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import ListaAnuncios from '@/components/ListaAnuncios.vue'
import AnuncioDetail from '@/components/AnuncioDetail.vue'
import { auth } from '@/config/firebaseConfig'

const routes = [
  {
    path: '/',
    redirect: { name: 'Login' }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterForm
  },
  {
    path: '/anuncios',
    name: 'ListaAnuncios',
    component: ListaAnuncios,
    meta: { requiresAuth: true }
  },
  {
    path: '/anuncios/:id',
    name: 'DetalleAnuncio',
    component: AnuncioDetail,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegación (antes de cada ruta)
router.beforeEach((to, from) => {
  let user = auth.currentUser
  if (to.meta.requiresAuth && !user) {
    return { name: 'Login' }
  }
})

export default router
