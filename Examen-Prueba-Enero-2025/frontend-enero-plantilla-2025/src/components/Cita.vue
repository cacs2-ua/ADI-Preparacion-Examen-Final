<!-- src/components/Cita.vue -->

<script setup>
import { ref, onMounted } from 'vue'
import { getCitaAleatoria } from '@/firebase/repositories/citasRepository.js'

const cita = ref({ texto: '', autor: '' })

async function obtenerCita() {
  try {
    const nuevaCita = await getCitaAleatoria()
    cita.value = nuevaCita
  } catch (error) {

    console.error(error)
    cita.value = { texto: 'Error al obtener la cita', autor: '' }
  }
}

onMounted(() => {
  obtenerCita()
})
</script>

<template>
  <div class="container">
    <div class="cita-card">
      <p class="texto">{{ cita.texto }}</p>
      <p class="autor">{{ cita.autor }}</p>
      <button class="boton" @click="obtenerCita">
        Obtener nueva cita
      </button>
    </div>
  </div>
</template>

<style>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  min-height: 100vh; 
  background-color: #f0f4f8;
}

.cita-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.texto {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 300;
  color: #333;
}

.autor {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #555;
}

.boton {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.boton:hover {
  background-color: #45a049;
}

</style>
