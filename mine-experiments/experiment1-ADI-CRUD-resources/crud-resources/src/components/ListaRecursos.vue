<script setup>
import { onMounted, reactive } from 'vue'
import { getRecursos, addRecurso, deleteRecurso } from '@/repositories/recursoRepository'
import Recurso from './Recurso.vue'
import AddRecursoForm from './AddRecursoForm.vue'
import { logout } from '@/services/authService'

let estado = reactive({
  recursos: []
})

onMounted(async () => {
  estado.recursos = await getRecursos()
})

async function do_logout() {
  await logout()
}

async function do_add_recurso(obj) {
  try {
    let agregado = await addRecurso(obj)
    estado.recursos.push(agregado)
  } catch (error) {
    alert(error.message)
  }
}

async function do_delete_recurso(id) {
  try {
    await deleteRecurso(id)
    let pos = estado.recursos.findIndex(x => x.id === id)
    if (pos > -1) {
      estado.recursos.splice(pos, 1)
    }
  } catch (error) {
    alert(error.message)
  }
}

function do_local_update_recurso({ id, campos }) {
  let recurso = estado.recursos.find(r => r.id === id)
  if (recurso) {
    for (let k of Object.keys(campos)) {
      recurso[k] = campos[k]
    }
  }
}
</script>

<template>
  <div class="lista-recursos-container">
    <h2>Listado de Recursos</h2>
    <AddRecursoForm @add_recurso="do_add_recurso" />

    <ul class="recursos-ul">
      <li v-for="recurso in estado.recursos" :key="recurso.id">
        <Recurso
          v-bind="recurso"
          @delete_recurso="do_delete_recurso"
          @local_update_recurso="do_local_update_recurso"
        />
      </li>
    </ul>

    <button @click="do_logout" class="btn-logout">Salir</button>
  </div>
</template>

<style scoped>
.lista-recursos-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.recursos-ul {
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
