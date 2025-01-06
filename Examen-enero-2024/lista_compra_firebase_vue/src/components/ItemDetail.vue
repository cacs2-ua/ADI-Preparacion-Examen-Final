<script setup>
// NUEVO: Componente para ver los detalles de un ítem
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getItemById } from '@/repositories/listaRepository'

const route = useRoute()
const router = useRouter()

let item = ref(null)
let error = ref(null)

onMounted(async () => {
  try {
    // Obtenemos el id de la URL
    let id = route.params.id
    item.value = await getItemById(id)
  } catch (err) {
    error.value = err.message
  }
})

function volver() {
  router.push('/lista')
}
</script>

<template>
  <div>
    <h2>Detalles del ítem</h2>
    <div v-if="error">
      <p style="color:red">Error: {{ error }}</p>
    </div>
    <div v-else-if="item">
      <p><b>ID:</b> {{ item.id }}</p>
      <p><b>Nombre:</b> {{ item.nombre }}</p>
      <p><b>Comprado:</b> {{ item.comprado ? 'Sí' : 'No' }}</p>
      <p><b>UID del usuario:</b> {{ item.uid }}</p>
    </div>
    <button @click="volver">Volver a la lista</button>
  </div>
</template>
