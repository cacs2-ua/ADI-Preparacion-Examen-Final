<script setup>
import { reactive } from 'vue'
import { registrarUsuario } from '@/services/authService'
import { useRouter } from 'vue-router'

let estado = reactive({
  username: '',
  email: '',
  password: ''
})

const router = useRouter()

async function do_register() {
  try {
    await registrarUsuario(estado.username, estado.email, estado.password)
    router.push('/anuncios')
  } catch (error) {
    alert(error.message)
  }
}
</script>

<template>
  <form @submit.prevent="do_register">
    <h2>Registro de Usuario</h2>
    <label>Nombre de Usuario</label>
    <input type="text" v-model="estado.username" required>

    <label>Email</label>
    <input type="email" v-model="estado.email" required>

    <label>Contraseña</label>
    <input type="password" v-model="estado.password" required>

    <button type="submit">Registrarse</button>
  </form>

  <RouterLink to="/login">¿Ya tienes cuenta? Inicia sesión</RouterLink>
</template>
