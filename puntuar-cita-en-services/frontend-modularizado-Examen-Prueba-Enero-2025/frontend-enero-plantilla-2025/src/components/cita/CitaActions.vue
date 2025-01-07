<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  valorInicialPuntuacion: {
    type: Number,
    default: 5
  }
})

const emits = defineEmits(['puntuar', 'obtener-cita', 'actualizar-puntuacion'])

const nuevaPuntuacion = ref(props.valorInicialPuntuacion)

function onChangePuntuacion(event) {
  const valor = parseFloat(event.target.value)
  nuevaPuntuacion.value = valor
  emits('actualizar-puntuacion', valor)
}

function onPuntuar() {
  emits('puntuar', nuevaPuntuacion.value)
}

function onObtenerCita() {
  emits('obtener-cita')
}
</script>

<template>
  <div class="puntuar">
    <input
      type="number"
      min="0"
      max="10"
      step="1"
      :value="nuevaPuntuacion"
      @input="onChangePuntuacion"
      class="input-puntuacion"
    />
    <button class="boton" @click="onPuntuar">
      Puntuar
    </button>
  </div>
  <button class="boton obtener-cita" @click="onObtenerCita">
    Obtener nueva cita
  </button>
</template>

<style scoped>
/* Botón general */
.boton {
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Hover y active */
.boton:hover {
  background-color: #45a049;
}

.boton:active {
  background-color: #3e8e41;
  transform: scale(0.98);
}

/* Botón específico para obtener cita */
.boton.obtener-cita {
  margin-top: 1rem;
  background-color: #2196f3;
}

.boton.obtener-cita:hover {
  background-color: #1e88e5;
}

.boton.obtener-cita:active {
  background-color: #1565c0;
}

/* Input de puntuación */
.input-puntuacion {
  width: 70px;
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  text-align: center;
  font-size: 1rem;
  margin-right: 1rem;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-puntuacion:focus {
  border-color: #4caf50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}
</style>
