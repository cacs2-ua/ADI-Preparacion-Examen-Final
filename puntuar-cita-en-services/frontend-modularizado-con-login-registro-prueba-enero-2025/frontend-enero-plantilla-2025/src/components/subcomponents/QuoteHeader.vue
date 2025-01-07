<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  texto: {
    type: String,
    default: ''
  },
  autor: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <p class="texto">{{ props.texto }}</p>
  <p class="autor">— {{ props.autor }}</p>
</template>

<style scoped>
.texto {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 300;
  color: #333;
}

.autor {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #555;
}
</style>
