import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import ListaRecursos from '@/components/ListaRecursos.vue'
import RecursoDetail from '@/components/RecursoDetail.vue'
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
    path: '/recursos',
    name: 'ListaRecursos',
    component: ListaRecursos,
    meta: { requiresAuth: true }
  },
  {
    path: '/recursos/:id',
    name: 'DetalleRecurso',
    component: RecursoDetail,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegación
router.beforeEach((to, from) => {
  let user = auth.currentUser
  if (to.meta.requiresAuth && !user) {
    return { name: 'Login' }
  }
})

export default router
