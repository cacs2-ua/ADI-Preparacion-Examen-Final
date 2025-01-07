<script setup>
import { ref } from 'vue'
import { updateRecurso } from '@/repositories/recursoRepository'
import { useRouter } from 'vue-router'

let props = defineProps(["id", "texto", "nombreAutor", "fecha", "hora", "uid"])
let emit = defineEmits(["delete_recurso", "local_update_recurso"])

let modoEdicion = ref(false)
let nuevoTexto = ref(props.texto)
let nuevoAutor = ref(props.nombreAutor)

const router = useRouter()

async function toggleEdicion() {
  if (modoEdicion.value) {
    try {
      let camposCambiar = {}
      if (nuevoTexto.value !== props.texto) camposCambiar.texto = nuevoTexto.value
      if (nuevoAutor.value !== props.nombreAutor) camposCambiar.nombreAutor = nuevoAutor.value

      if (Object.keys(camposCambiar).length > 0) {
        await updateRecurso(props.id, camposCambiar)
        emit('local_update_recurso', {
          id: props.id,
          campos: { ...camposCambiar }
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
  router.push(`/recursos/${props.id}`)
}
</script>

<template>
  <div class="recurso-row">
    <div class="recurso-text">
      <span v-if="!modoEdicion">
        {{ texto }} - {{ nombreAutor }}
      </span>
      <div v-else>
        <input type="text" v-model="nuevoTexto" class="edit-input">
        <input type="text" v-model="nuevoAutor" class="edit-input">
      </div>
    </div>

    <div class="recurso-buttons">
      <button @click="$emit('delete_recurso', id)" class="btn-delete">Eliminar</button>
      <button @click="toggleEdicion" class="btn-edit">
        {{ modoEdicion ? 'Guardar' : 'Editar' }}
      </button>
      <button @click="verDetalles" class="btn-details">Ver detalles</button>
    </div>
  </div>
</template>

<style scoped>
.recurso-row {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.recurso-text {
  flex: 1;
  margin-right: 20px;
}

.edit-input {
  display: block;
  margin-bottom: 5px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

.recurso-buttons {
  display: flex;
  align-items: center;
}

.btn-delete {
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 8px;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #c9302c;
}

.btn-edit {
  background-color: #f0ad4e;
  color: white;
  border: none;
  padding: 8px;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit:hover {
  background-color: #ec971f;
}

.btn-details {
  background-color: #5bc0de;
  color: white;
  border: none;
  padding: 8px;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-details:hover {
  background-color: #31b0d5;
}
</style>
