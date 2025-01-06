<script setup>
import { ref } from 'vue'
import { updateAnuncio } from '@/repositories/anuncioRepository'
import { useRouter } from 'vue-router'

let props = defineProps(["id", "texto", "nombreAutor", "fecha", "hora", "uid"])

let emit = defineEmits(["delete_anuncio", "local_update_anuncio"])

let modoEdicion = ref(false)
let nuevoTexto = ref(props.texto)
let nuevoAutor = ref(props.nombreAutor)

const router = useRouter()

async function toggleEdicion() {
  if (modoEdicion.value) {
    // Al guardar
    try {
      let camposCambiar = {}
      if (nuevoTexto.value !== props.texto) camposCambiar.texto = nuevoTexto.value
      if (nuevoAutor.value !== props.nombreAutor) camposCambiar.nombreAutor = nuevoAutor.value

      // Si hay algo que cambiar
      if (Object.keys(camposCambiar).length > 0) {
        await updateAnuncio(props.id, camposCambiar)
        emit('local_update_anuncio', {
          id: props.id,
          campos: {
            ...camposCambiar
          }
        })
      }
    } catch (error) {
      alert(error.message)
      return
    }
  }
  modoEdicion.value = !modoEdicion.value
}

function verDetalles() {
  router.push(`/anuncios/${props.id}`)
}
</script>

<template>
  <div class="anuncio-row">
    <div class="anuncio-text">
      <span v-if="!modoEdicion">
        {{ texto }} - {{ nombreAutor }}
      </span>
      <div v-else>
        <input type="text" v-model="nuevoTexto">
        <input type="text" v-model="nuevoAutor">
      </div>
    </div>

    <div class="anuncio-buttons">
      <button @click="$emit('delete_anuncio', id)">Eliminar</button>
      <button @click="toggleEdicion">{{ modoEdicion ? 'Guardar' : 'Editar' }}</button>
      <button @click="verDetalles">Ver detalles</button>
    </div>
  </div>
</template>

<style scoped>
.anuncio-row {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.anuncio-text {
  flex: 1;
  margin-right: 20px;
}

.anuncio-buttons {
  display: flex;
  align-items: center;
}

.anuncio-buttons button {
  margin-left: 10px;
}
</style>
