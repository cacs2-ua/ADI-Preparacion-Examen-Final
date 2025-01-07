<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  puntuacionMedia: {
    type: Number,
    default: 0
  },
  numeroDePuntuaciones: {
    type: Number,
    default: 0
  },
  nuevaPuntuacion: {
    type: Number,
    default: 5
  }
})

// defineEmits para comunicar acciones al padre
const emits = defineEmits(['onPuntuar', 'onActualizarPuntuacion'])

// localRef para el input (aunque se puede v-model con props/emits)
const localPuntuacion = ref(props.nuevaPuntuacion)

// Sincronizar local con prop inicial
localPuntuacion.value = props.nuevaPuntuacion

function actualizarPuntuacion(nuevoValor) {
  localPuntuacion.value = Number(nuevoValor)
  emits('onActualizarPuntuacion', localPuntuacion.value)
}

function emitirPuntuar() {
  emits('onPuntuar')
}
</script>

<template>
  <div class="puntuacion">
    <p class="media">
      Puntuación Media:
      <span v-if="numeroDePuntuaciones > 0">
        {{ puntuacionMedia.toFixed(2) }} / 10
      </span>
      <span v-else>
        No hay puntuaciones aún.
      </span>
    </p>
    <p class="numero">
      Número de Puntuaciones: {{ numeroDePuntuaciones }}
    </p>
  </div>

  <div class="puntuar">
    <input
      type="number"
      min="0"
      max="10"
      step="1"
      :value="localPuntuacion"
      @input="(e) => actualizarPuntuacion(e.target.value)"
      placeholder="Ingresa una puntuación (0-10)"
      class="input-puntuacion"
    />
    <button class="boton" @click="emitirPuntuar">
      Puntuar
    </button>
  </div>
</template>

<style scoped>
.puntuacion {
  margin-bottom: 1.5rem;
}

.media,
.numero {
  font-size: 1rem;
  color: #666;
}

.puntuar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.input-puntuacion {
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}

/* Reutilizamos la misma clase .boton */
.boton {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.boton:hover {
  background-color: #45a049;
}
</style>
