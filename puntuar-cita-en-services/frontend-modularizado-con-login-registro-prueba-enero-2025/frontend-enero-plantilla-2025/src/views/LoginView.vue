<!-- NUEVO FICHERO: src/views/LoginView.vue -->
<script setup>
import { ref } from 'vue'
import { loginUser } from '@/firebase/services/AuthService.js'
import { useRouter } from 'vue-router'

const router = useRouter()

// Campos reactivos
const email = ref('')
const password = ref('')

// Manejo de errores básico
const errorMessage = ref('')

async function handleLogin() {
  errorMessage.value = ''
  if (!email.value || !password.value) {
    errorMessage.value = 'Debe ingresar email y contraseña'
    return
  }
  try {
    await loginUser(email.value, password.value)
    router.push('/citas')
  } catch (error) {
    errorMessage.value = 'Error al iniciar sesión'
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Iniciar Sesión</h2>
      <input
        v-model="email"
        type="email"
        placeholder="Email"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
      />
      <button @click="handleLogin">Entrar</button>
      <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
      <p class="link">
        ¿No tienes cuenta?
        <router-link to="/register">Registrarse</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f4f8;
}

.login-card {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
  max-width: 90%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-card h2 {
  margin-bottom: 1rem;
}

.login-card input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.login-card button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
}

.login-card button:hover {
  background-color: #45a049;
}

.error {
  margin-top: 1rem;
  color: red;
}

.link {
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>
