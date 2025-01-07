<!-- NUEVO FICHERO: src/views/RegisterView.vue -->
<script setup>
import { ref } from 'vue'
import { registerUser } from '@/firebase/services/AuthService.js'
import { useRouter } from 'vue-router'

const router = useRouter()

// Campos reactivos
const displayName = ref('')
const email = ref('')
const password = ref('')

// Manejo de errores básico
const errorMessage = ref('')

async function handleRegister() {
  errorMessage.value = ''
  if (!displayName.value || !email.value || !password.value) {
    errorMessage.value = 'Debe ingresar username, email y contraseña'
    return
  }
  try {
    await registerUser(email.value, password.value, displayName.value)
    router.push('/citas')
  } catch (error) {
    errorMessage.value = 'Error al registrar usuario'
  }
}
</script>

<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Registro de Usuario</h2>
      <input
        v-model="displayName"
        type="text"
        placeholder="Username"
      />
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
      <button @click="handleRegister">Registrar</button>
      <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
      <p class="link">
        ¿Ya tienes cuenta?
        <router-link to="/login">Iniciar sesión</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f4f8;
}

.register-card {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
  max-width: 90%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.register-card h2 {
  margin-bottom: 1rem;
}

.register-card input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.register-card button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
}

.register-card button:hover {
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
