<script setup>
import { defineEmits } from 'vue'

const emits = defineEmits(['onObtenerCita', 'onLogout'])

function emitirObtenerCita() {
  emits('onObtenerCita')
}
function emitirLogout() {
  emits('onLogout')
}
</script>

<template>
  <button class="boton" @click="emitirObtenerCita">
    Obtener nueva cita
  </button>
  <button class="boton logout-btn" @click="emitirLogout">
    Logout
  </button>
</template>

<style scoped>
.boton {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin: 0.25rem 0;
}

.boton:hover {
  background-color: #45a049;
}

.logout-btn {
  background-color: #f44336;
  margin-top: 1rem;
}

.logout-btn:hover {
  background-color: #d32f2f;
}
</style>
