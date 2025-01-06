import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';
import ListaCompra from '@/components/ListaCompra.vue';
import About from '@/components/About.vue';
import RegisterForm from '@/components/RegisterForm.vue'; // NUEVO
import ItemDetail from '@/components/ItemDetail.vue';       // NUEVO
import { auth } from '@/config/firebaseConfig';

// Definición de rutas
const routes = [
  {
    path: '/',
    redirect: { name: 'Lista' }
  },
  {
    path: '/lista',
    name: 'Lista',
    component: ListaCompra,
    meta: { requiresAuth: true },
  },
  {
    // NUEVO
    // Ruta para ver los detalles de un item: /lista/1234
    path: '/lista/:id',
    name: 'ItemDetail',
    component: ItemDetail,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
  },
  {
    // NUEVO
    path: '/register',
    name: 'Register',
    component: RegisterForm
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard de navegación para verificar autenticación
router.beforeEach((to, from) => {
  const user = auth.currentUser;
  if (to.meta.requiresAuth && !user) {
    return { name: 'Login' };
  }
});

export default router;
