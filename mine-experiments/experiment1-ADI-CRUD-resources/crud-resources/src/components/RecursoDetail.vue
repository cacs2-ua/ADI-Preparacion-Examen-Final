<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRecursoById } from '@/repositories/recursoRepository'

let route = useRoute()
let router = useRouter()

let recurso = ref(null)
let error = ref(null)

onMounted(async () => {
  try {
    let id = route.params.id
    recurso.value = await getRecursoById(id)
  } catch (err) {
    error.value = err.message
  }
})

function volver() {
  router.push('/recursos')
}
</script>

<template>
  <div class="recurso-detail-container">
    <h2>Detalles del recurso</h2>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else-if="recurso" class="recurso-detail-info">
      <p><b>ID:</b> {{ recurso.id }}</p>
      <p><b>Texto:</b> {{ recurso.pesaje }}</p>
      <p><b>Altura:</b> {{ recurso.altura }}</p>
      <p><b>Edad:</b> {{ recurso.edad }}</p>
      <p><b>Autor:</b> {{ recurso.nombreAutor }}</p>
      <p><b>Fecha:</b> {{ recurso.fecha }}</p>
      <p><b>Hora:</b> {{ recurso.hora }}</p>
    </div>
    <button @click="volver" class="btn-back">Volver</button>
  </div>
</template>

<style scoped>
.recurso-detail-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.error-message {
  color: red;
  font-weight: bold;
  margin: 20px 0;
}

.recurso-detail-info {
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  text-align: left;
  padding: 20px;
  border-radius: 8px;
}

.recurso-detail-info p {
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
