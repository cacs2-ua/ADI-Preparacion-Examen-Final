<script setup>
import { onMounted, reactive } from 'vue'
import { getAnuncios, addAnuncio, deleteAnuncio } from '@/repositories/anuncioRepository'
import Anuncio from './Anuncio.vue'
import AddAnuncioForm from './AddAnuncioForm.vue'
import { logout } from '@/services/authService'

let estado = reactive({
  anuncios: []
})

onMounted(async () => {
  estado.anuncios = await getAnuncios()
})

async function do_logout() {
  await logout()
}

async function do_add_anuncio(obj) {
  try {
    let anuncioAgregado = await addAnuncio(obj)
    estado.anuncios.push(anuncioAgregado)
  } catch (error) {
    alert(error.message)
  }
}

async function do_delete_anuncio(id) {
  try {
    await deleteAnuncio(id)
    let pos = estado.anuncios.findIndex(x => x.id === id)
    if (pos > -1) {
      estado.anuncios.splice(pos, 1)
    }
  } catch (error) {
    alert(error.message)
  }
}

function do_local_update_anuncio({ id, campos }) {
  let anuncio = estado.anuncios.find(a => a.id === id)
  if (anuncio) {
    for (let k of Object.keys(campos)) {
      anuncio[k] = campos[k]
    }
  }
}
</script>

<template>
  <h2>Listado de Anuncios</h2>
  <AddAnuncioForm @add_anuncio="do_add_anuncio" />

  <ul>
    <li v-for="anuncio in estado.anuncios" :key="anuncio.id">
      <Anuncio
        v-bind="anuncio"
        @delete_anuncio="do_delete_anuncio"
        @local_update_anuncio="do_local_update_anuncio"
      />
    </li>
  </ul>

  <button @click="do_logout">Salir</button>
</template>
