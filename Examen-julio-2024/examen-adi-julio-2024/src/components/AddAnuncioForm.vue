<script setup>
import { ref } from 'vue'

let emit = defineEmits(['add_anuncio'])
let texto = ref('')
let nombreAutor = ref('')

function do_add() {
  if (texto.value.trim() && nombreAutor.value.trim()) {
    emit('add_anuncio', {
      texto: texto.value,
      nombreAutor: nombreAutor.value
    })
    texto.value = ''
    nombreAutor.value = ''
  } else {
    alert('Debes introducir texto y autor')
  }
}
</script>

<template>
  <div>
    <h3>Añadir un anuncio</h3>
    <input type="text" v-model="texto" placeholder="Texto del anuncio">
    <input type="text" v-model="nombreAutor" placeholder="Nombre del autor">
    <button @click="do_add">Añadir</button>
  </div>
</template>
