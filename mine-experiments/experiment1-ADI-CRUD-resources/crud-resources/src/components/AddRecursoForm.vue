<script setup>
import { ref } from 'vue'

let emit = defineEmits(['add_recurso'])
let pesaje = ref('')
let nombreAutor = ref('')

function do_add() {
  if (pesaje.value.trim() && nombreAutor.value.trim()) {
    emit('add_recurso', {
      pesaje: pesaje.value,
      nombreAutor: nombreAutor.value
    })
    pesaje.value = ''
    nombreAutor.value = ''
  } else {
    alert('Debes introducir pesaje y autor')
  }
}
</script>

<template>
  <div class="add-recurso-container">
    <h3>Añadir un recurso</h3>
    <input type="text" v-model="pesaje" placeholder="Texto del pesaje" class="input-rc">
    <input type="text" v-model="nombreAutor" placeholder="Nombre del autor" class="input-rc">
    <button @click="do_add" class="btn-add">Añadir</button>
  </div>
</template>

<style scoped>
.add-recurso-container {
  margin-top: 20px;
  text-align: center;
}

.input-rc {
  display: block;
  margin: 0 auto 10px auto;
  padding: 8px;
  width: 80%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-add {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
}

.btn-add:hover {
  background-color: #45a049;
}
</style>
