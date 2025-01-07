<script setup>
import { ref, onMounted } from 'vue'
import { getCitaAleatoria} from '@/firebase/repositories/citasRepository.js'
import { puntuarCita } from '@/firebase/services/citasService.js'

// Importamos los subcomponentes
import CitaDisplay from './cita/CitaDisplay.vue'
import CitaPuntuacion from './cita/CitaPuntuacion.vue'
import CitaActions from './cita/CitaActions.vue'

const cita = ref({
  id: '',
  texto: '',
  autor: '',
  puntuacionMedia: 0,
  numeroDePuntuaciones: 0,
})

const nuevaPuntuacion = ref(5)

// Función para obtener una nueva cita
async function obtenerCita() {
  try {
    const citaAleatoria = await getCitaAleatoria()
    cita.value = citaAleatoria
  } catch (error) {
    console.error(error)
    cita.value = {
      id: '',
      texto: 'Error al obtener la cita',
      autor: '',
      puntuacionMedia: 0,
      numeroDePuntuaciones: 0,
    }
  }
}

// Función para puntuar la cita actual
async function puntuar(puntuacion) {
  const valor = parseFloat(puntuacion)
  if (isNaN(valor) || valor < 0 || valor > 10) {
    alert('Por favor, ingresa una puntuación válida entre 0 y 10.')
    return
  }

  if (!cita.value.id) {
    alert('No hay una cita válida para puntuar.')
    return
  }

  try {
    await puntuarCita(cita.value.id, valor)
    await obtenerCita()
  } catch (error) {
    alert('Error al puntuar la cita. Inténtalo de nuevo.')
  }
}

function actualizarPuntuacion(nuevoValor) {
  nuevaPuntuacion.value = nuevoValor
}

onMounted(() => {
  obtenerCita()
})
</script>

<template>
  <div class="container">
    <div class="cita-card">
      <CitaDisplay
        :texto="cita.texto"
        :autor="cita.autor"
      />
      <CitaPuntuacion
        :puntuacionMedia="cita.puntuacionMedia"
        :numeroDePuntuaciones="cita.numeroDePuntuaciones"
      />
      <CitaActions
        :valorInicialPuntuacion="nuevaPuntuacion"
        @puntuar="puntuar"
        @obtener-cita="obtenerCita"
        @actualizar-puntuacion="actualizarPuntuacion"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f4f8;
}

.cita-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.texto {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 300;
  color: #333;
}

.autor {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #555;
}

.puntuacion {
  margin-bottom: 1.5rem;
}

.media,
.numero {
  font-size: 1rem;
  color: #666;
}

.puntuar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.input-puntuacion {
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}

.boton {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.boton:hover {
  background-color: #45a049;
}

@media (max-width: 600px) {
  .cita-card {
    padding: 1.5rem;
  }

  .texto {
    font-size: 1.2rem;
  }

  .autor {
    font-size: 1rem;
  }

  .boton {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }
}
</style>
