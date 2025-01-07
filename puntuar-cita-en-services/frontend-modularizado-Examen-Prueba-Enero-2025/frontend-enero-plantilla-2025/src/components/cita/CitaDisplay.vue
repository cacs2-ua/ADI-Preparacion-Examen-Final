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
  <p class="texto">{{ texto }}</p>
  <p class="autor">— {{ autor }}</p>
</template>

<style scoped>
</style>
