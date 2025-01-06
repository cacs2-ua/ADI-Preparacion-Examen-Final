<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAnuncioById } from '@/repositories/anuncioRepository'

let route = useRoute()
let router = useRouter()

let anuncio = ref(null)
let error = ref(null)

onMounted(async () => {
  try {
    let id = route.params.id
    anuncio.value = await getAnuncioById(id)
  } catch (err) {
    error.value = err.message
  }
})

function volver() {
  router.push('/anuncios')
}
</script>

<template>
  <div class="anuncio-detail-container">
    <h2>Detalles del anuncio</h2>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else-if="anuncio" class="anuncio-detail-info">
      <p><b>ID:</b> {{ anuncio.id }}</p>
      <p><b>Texto:</b> {{ anuncio.texto }}</p>
      <p><b>Autor:</b> {{ anuncio.nombreAutor }}</p>
      <p><b>Fecha:</b> {{ anuncio.fecha }}</p>
      <p><b>Hora:</b> {{ anuncio.hora }}</p>
    </div>
    <button @click="volver" class="btn-back">Volver</button>
  </div>
</template>

<style scoped>
/* NUEVO: Estilos para la vista de detalles */

.anuncio-detail-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.error-message {
  color: red;
  font-weight: bold;
  margin: 20px 0;
}

.anuncio-detail-info {
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  text-align: left;
  padding: 20px;
  border-radius: 8px;
}

.anuncio-detail-info p {
  margin: 5px 0;
}

.btn-back {
  margin-top: 20px;
  background-color: #337ab7;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.btn-back:hover {
  background-color: #286090;
}
</style>
