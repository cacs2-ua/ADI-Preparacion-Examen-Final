<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  puntuacionMedia: {
    type: Number,
    default: 0
  },
  numeroDePuntuaciones: {
    type: Number,
    default: 0
  }
})
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
</template>

<style scoped>
</style>
