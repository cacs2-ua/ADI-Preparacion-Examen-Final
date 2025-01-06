<script setup>
import { computed, ref } from 'vue'
import { updateItem } from '@/repositories/listaRepository'

let props = defineProps(["id", "nombre", "comprado", "uid"])
let emit = defineEmits(["delete_item", "switch_item", "update_item_name"])

let modoEdicion = ref(false)
let nuevoNombre = ref(props.nombre)

let estilo = computed(() => props.comprado ? "tachado" : "")

async function toggleEdicion() {
  if (modoEdicion.value) {
    try {
      await updateItem(props.id, nuevoNombre.value)
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
  <div class="item-row">
    <div class="item-text">
      <span :class="estilo" @click="$emit('switch_item', id)" v-if="!modoEdicion">
        {{ nombre }}
      </span>
      <input v-else type="text" v-model="nuevoNombre" />
    </div>
    <div class="item-buttons">
      <button @click="$emit('delete_item', id)" class="btn eliminar">Eliminar</button>
      <button @click="toggleEdicion" class="btn editar">
        {{ modoEdicion ? 'Guardar' : 'Editar' }}
      </button>
      <RouterLink :to="`/lista/${id}`" class="link-detalles">Ver detalles</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.tachado {
  text-decoration: line-through;
  color: lightgrey;
}

/* NUEVO o MODIFICADO: Ajustamos el ancho, el padding y el espacio entre texto y botones */
.item-row {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

/* El texto del ítem ocupa todo el espacio posible, deja hueco para los botones */
.item-text {
  flex: 1;
  margin-right: 20px;
  font-size: 16px;
  color: #333;
}

/* Botones a la derecha */
.item-buttons {
  display: flex;
  align-items: center;
}

/* Márgenes entre ellos */
.item-buttons .btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 12px;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.item-buttons .btn:hover {
  background-color: #45a049;
}

.link-detalles {
  color: #1e90ff;
  margin-left: 10px;
  text-decoration: none;
}

.link-detalles:hover {
  text-decoration: underline;
}
</style>
