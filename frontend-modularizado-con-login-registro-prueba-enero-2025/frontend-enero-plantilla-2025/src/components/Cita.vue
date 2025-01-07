<!-- CÓDIGO NUEVO/MODIFICADO EN: src/components/Cita.vue -->

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCitaAleatoria, puntuarCita } from '@/firebase/repositories/citasRepository.js'
import { logoutUser } from '@/firebase/services/AuthService.js'

// SUBCOMPONENTES IMPORTADOS
import QuoteHeader from './subcomponents/QuoteHeader.vue'
import RatingSection from './subcomponents/RatingSection.vue'
import CitaActions from './subcomponents/CitaActions.vue'

const router = useRouter()

// Mantenemos la reactividad y la lógica igual que antes
const cita = ref({
  id: '',
  texto: '',
  autor: '',
  puntuacionMedia: 0,
  numeroDePuntuaciones: 0
})

const nuevaPuntuacion = ref(5)

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
      <!-- 1) Cabecera de la Cita (texto y autor) -->
      <QuoteHeader
        :texto="cita.texto"
        :autor="cita.autor"
      />

      <!-- 2) Sección de puntuación -->
      <RatingSection
        :puntuacionMedia="cita.puntuacionMedia"
        :numeroDePuntuaciones="cita.numeroDePuntuaciones"
        :nuevaPuntuacion="nuevaPuntuacion"
        @onPuntuar="puntuar"
        @onActualizarPuntuacion="(nuevoValor) => { nuevaPuntuacion.value = nuevoValor }"
      />

      <!-- 3) Botones para obtener cita y logout (y conservamos el mismo diseño) -->
      <CitaActions
        @onObtenerCita="obtenerCita"
        @onLogout="handleLogout"
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

</style>
