<script setup>
import { logout } from '@/services/authService';
import { reactive, onMounted } from 'vue';
import AddItemForm from './AddItemForm.vue';
import { addItem, getItems, deleteItem, setItemComprado } from '@/repositories/listaRepository';
import Lista from './Lista.vue';

let estado = reactive({ items: [] })

onMounted(async function() {
  estado.items = await getItems()
})

async function do_logout() {
  await logout()
}

async function do_add_item(nombre) {
  try {
    let obj = await addItem(nombre)
    estado.items.push(obj)
  }
  catch (error) {
    alert(error.message)
  }
}

async function do_delete(id) {
  await deleteItem(id)
  let pos = estado.items.findIndex((i) => i.id == id)
  if (pos > -1) {
    estado.items.splice(pos, 1)
  }
}

async function do_switch(id) {
  let obj = estado.items.find((item) => item.id == id)
  if (obj) {
    let nuevo = !obj.comprado
    await setItemComprado(id, nuevo)
    obj.comprado = nuevo
  }
}

// NUEVO: Actualizar localmente el nombre del ítem al guardar
function do_update_item_name({ id, nombre }) {
  let item = estado.items.find((i) => i.id === id)
  if (item) {
    item.nombre = nombre
  }
}
</script>

<template>
  <h2>Lista de la compra</h2>
  <add-item-form @add_item="do_add_item"/>
  <lista 
    :items="estado.items"
    @delete_item="do_delete"
    @switch_item="do_switch"
    @update_item_name="do_update_item_name" >
  </lista>

  <button @click="do_logout">Salir</button>
</template>
