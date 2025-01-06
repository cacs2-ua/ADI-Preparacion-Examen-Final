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
  <div>
    <h2>Detalles del anuncio</h2>
    <div v-if="error">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="anuncio">
      <p><b>ID:</b> {{ anuncio.id }}</p>
      <p><b>Texto:</b> {{ anuncio.texto }}</p>
      <p><b>Autor:</b> {{ anuncio.nombreAutor }}</p>
      <p><b>Fecha:</b> {{ anuncio.fecha }}</p>
      <p><b>Hora:</b> {{ anuncio.hora }}</p>
    </div>
    <button @click="volver">Volver</button>
  </div>
</template>
