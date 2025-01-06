<script setup>
// NUEVO: Formulario de registro
import { reactive } from 'vue'
import { registrarUsuario } from '@/services/authService'
import { useRouter } from 'vue-router'

const router = useRouter()
let estado = reactive({
  username: '',
  email: '',
  password: ''
})

async function do_register() {
  try {
    // Llamamos al servicio pasándole username, email y password
    await registrarUsuario(estado.username, estado.email, estado.password)
    alert("Usuario registrado con éxito.")
    // Una vez registrado, redirigimos a la lista
    router.push('/lista')
  } catch (error) {
    alert(error.message)
  }
}
</script>

<template>
  <form @submit.prevent="do_register">
    <h2>Registro de usuario</h2>

    <label for="username">Nombre de usuario:</label>
    <input
      type="text"
      id="username"
      v-model="estado.username"
      required
    />

    <label for="email">Correo electrónico:</label>
    <input
      type="email"
      id="email"
      v-model="estado.email"
      required
    />

    <label for="password">Contraseña:</label>
    <input
      type="password"
      id="password"
      v-model="estado.password"
      required
    />

    <button type="submit">Registrarse</button>
  </form>

  <RouterLink to="/login">
    ¿Ya tienes cuenta? Inicia sesión
  </RouterLink>
</template>
