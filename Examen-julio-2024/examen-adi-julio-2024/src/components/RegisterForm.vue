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
  <div class="register-container">
    <h2>Registro de Usuario</h2>
    <form @submit.prevent="do_register" class="form-container">
      <div class="form-group">
        <label>Nombre de Usuario</label>
        <input type="text" v-model="estado.username" required />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="estado.email" required />
      </div>
      <div class="form-group">
        <label>Contraseña</label>
        <input type="password" v-model="estado.password" required />
      </div>
      <button type="submit" class="btn-submit">Registrarse</button>
    </form>

    <RouterLink to="/login" class="link-alt">
      ¿Ya tienes cuenta? Inicia sesión
    </RouterLink>
  </div>
</template>

<style scoped>
/* NUEVO: Estilos para RegisterForm */

.register-container {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.form-container {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-submit {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.btn-submit:hover {
  background-color: #45a049;
}

.link-alt {
  display: inline-block;
  margin-top: 20px;
  color: #1e90ff;
  text-decoration: none;
}

.link-alt:hover {
  text-decoration: underline;
}
</style>
