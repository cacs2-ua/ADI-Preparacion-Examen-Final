<script setup>
import { computed, ref } from 'vue'
import { updateItem } from '@/repositories/listaRepository'

// MODIFICADO: Añadimos un nuevo evento 'update_item_name'
let props = defineProps(["id", "nombre", "comprado", "uid"])
let emit = defineEmits(["delete_item", "switch_item", "update_item_name"])

// Estado local para modo edición y el campo de texto
let modoEdicion = ref(false)
let nuevoNombre = ref(props.nombre)

// Computed para tachar si está comprado
let estilo = computed(() => props.comprado ? "tachado" : "")

async function toggleEdicion() {
  // si vamos a "guardar"
  if (modoEdicion.value) {
    try {
      await updateItem(props.id, nuevoNombre.value)
      // NUEVO: Emitir evento para que el padre actualice su array
      emit("update_item_name", { id: props.id, nombre: nuevoNombre.value })
    } catch (error) {
      alert(error.message)
      return
    }
  }
  modoEdicion.value = !modoEdicion.value
}
</script>

<template>

  <span :class="estilo" @click="$emit('switch_item', id)" v-if="!modoEdicion">
    {{ nombre }}
  </span>


  <input v-else type="text" v-model="nuevoNombre" />


  <button @click="toggleEdicion">
    {{ modoEdicion ? 'Guardar' : 'Editar' }}
  </button>


  <RouterLink :to="`/lista/${id}`">Ver detalles</RouterLink>

  <button @click="$emit('delete_item', id)">Eliminar</button>
</template>

<style scoped>
.tachado {
  text-decoration: line-through;
  color: lightgrey;
}
</style>
