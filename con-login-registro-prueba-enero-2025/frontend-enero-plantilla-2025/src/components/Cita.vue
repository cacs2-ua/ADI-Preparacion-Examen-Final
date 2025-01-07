<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCitaAleatoria, puntuarCita } from '@/firebase/repositories/citasRepository.js'
import { logoutUser } from '@/firebase/services/AuthService.js'

// Reactive object para almacenar la cita actual
const cita = ref({
  id: '',
  texto: '',
  autor: '',
  puntuacionMedia: 0,
  numeroDePuntuaciones: 0
})

// Reactive variable para la nueva puntuación
const nuevaPuntuacion = ref(5)

const router = useRouter()

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
      numeroDePuntuaciones: 0
    }
  }
}

async function puntuar() {
  const puntuacion = parseFloat(nuevaPuntuacion.value)
  if (isNaN(puntuacion) || puntuacion < 0 || puntuacion > 10) {
    alert('Por favor, ingresa una puntuación válida entre 0 y 10.')
    return
  }
  if (!cita.value.id) {
    alert('No hay una cita válida para puntuar.')
    return
  }
  try {
    await puntuarCita(cita.value.id, puntuacion)
    await obtenerCita()
  } catch (error) {
    alert('Error al puntuar la cita. Inténtalo de nuevo.')
  }
}

// Botón "Logout"
async function handleLogout() {
  try {
    await logoutUser()
    router.push('/login')
  } catch (error) {
    console.error('Error al hacer logout:', error)
  }
}

onMounted(() => {
  obtenerCita()
})
</script>

<template>
  <div class="container">
    <div class="cita-card">
      <p class="texto">{{ cita.texto }}</p>
      <p class="autor">— {{ cita.autor }}</p>
      <div class="puntuacion">
        <p class="media">
          Puntuación Media:
          <span v-if="cita.numeroDePuntuaciones > 0">
            {{ cita.puntuacionMedia.toFixed(2) }} / 10
          </span>
          <span v-else>
            No hay puntuaciones aún.
          </span>
        </p>
        <p class="numero">
          Número de Puntuaciones: {{ cita.numeroDePuntuaciones }}
        </p>
      </div>
      <div class="puntuar">
        <input
          type="number"
          min="0"
          max="10"
          step="1"
          v-model="nuevaPuntuacion"
          placeholder="Ingresa una puntuación (0-10)"
          class="input-puntuacion"
        />
        <button class="boton" @click="puntuar">Puntuar</button>
      </div>
      <button class="boton" @click="obtenerCita">
        Obtener nueva cita
      </button>
      <!-- Nuevo botón de Logout -->
      <button class="boton logout-btn" @click="handleLogout">
        Logout
      </button>
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
  margin: 0.25rem 0;
}

.boton:hover {
  background-color: #45a049;
}

/* Distinguimos el botón de logout si quieres */
.logout-btn {
  background-color: #f44336;
  margin-top: 1rem;
}

.logout-btn:hover {
  background-color: #d32f2f;
}
</style>
