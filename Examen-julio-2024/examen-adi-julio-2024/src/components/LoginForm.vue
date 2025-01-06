<script setup>
import { reactive } from 'vue'
import { login } from '@/services/authService'
import { useRouter } from 'vue-router'

let estado = reactive({
  email: '',
  password: ''
})

const router = useRouter()

async function do_login() {
  try {
    await login(estado.email, estado.password)
    router.push('/anuncios')
  } catch (error) {
    alert(error.message)
  }
}
</script>

<template>
  <form @submit.prevent="do_login">
    <h2>Iniciar sesión</h2>
    <label>Email</label>
    <input type="email" v-model="estado.email" required>

    <label>Contraseña</label>
    <input type="password" v-model="estado.password" required>

    <button type="submit">Iniciar sesión</button>
  </form>

  <RouterLink to="/register">¿No tienes cuenta? Regístrate aquí</RouterLink>
</template>
