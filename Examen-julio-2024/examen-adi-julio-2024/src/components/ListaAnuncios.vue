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
  <div class="lista-anuncios-container">
    <h2>Listado de Anuncios</h2>
    <AddAnuncioForm @add_anuncio="do_add_anuncio" />

    <ul class="anuncios-ul">
      <li v-for="anuncio in estado.anuncios" :key="anuncio.id">
        <Anuncio
          v-bind="anuncio"
          @delete_anuncio="do_delete_anuncio"
          @local_update_anuncio="do_local_update_anuncio"
        />
      </li>
    </ul>

    <button @click="do_logout" class="btn-logout">Salir</button>
  </div>
</template>

<style scoped>
/* NUEVO: Estilos para ListaAnuncios */

.lista-anuncios-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.anuncios-ul {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 20px;
}

.btn-logout {
  background-color: #d9534f;
  margin-top: 15px;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.btn-logout:hover {
  background-color: #c9302c;
}
</style>
