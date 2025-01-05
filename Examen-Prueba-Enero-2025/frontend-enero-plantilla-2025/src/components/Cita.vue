<!-- src/components/Cita.vue -->

<script setup>
import { ref, onMounted } from 'vue';
import { getCitaAleatoria, puntuarCita } from '@/firebase/repositories/citasRepository.js';

// Reactive object para almacenar la cita actual
const cita = ref({
  id: '',
  texto: '',
  autor: '',
  puntuacionMedia: 0,
  numeroDePuntuaciones: 0,
});

// Reactive variable para la nueva puntuación
const nuevaPuntuacion = ref(5); // Valor inicial por defecto

// Función para obtener una nueva cita
async function obtenerCita() {
  try {
    const citaAleatoria = await getCitaAleatoria();
    cita.value = citaAleatoria;
  } catch (error) {
    // Manejo de errores mínimo
    console.error(error);
    cita.value = {
      id: '',
      texto: 'Error al obtener la cita',
      autor: '',
      puntuacionMedia: 0,
      numeroDePuntuaciones: 0,
    };
  }
}

// Función para puntuar la cita actual
async function puntuar() {
  // Validar la puntuación
  const puntuacion = parseFloat(nuevaPuntuacion.value);
  if (isNaN(puntuacion) || puntuacion < 0 || puntuacion > 10) {
    alert('Por favor, ingresa una puntuación válida entre 0 y 10.');
    return;
  }

  if (!cita.value.id) {
    alert('No hay una cita válida para puntuar.');
    return;
  }

  try {
    await puntuarCita(cita.value.id, puntuacion);
    // Después de puntuar, actualizar la cita para reflejar la nueva media
    await obtenerCita();
  } catch (error) {
    alert('Error al puntuar la cita. Inténtalo de nuevo.');
  }
}

// Obtener la primera cita cuando se monta el componente
onMounted(() => {
  obtenerCita();
});
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
        <button class="boton" @click="puntuar">
          Puntuar
        </button>
      </div>
      <button class="boton" @click="obtenerCita">
        Obtener nueva cita
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal centrado */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* ocupa toda la altura de la ventana */
  background-color: #f0f4f8;
}

/* Tarjeta de la cita */
.cita-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Texto de la cita */
.texto {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 300;
  color: #333;
}

/* Autor de la cita */
.autor {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #555;
}

/* Sección de puntuación */
.puntuacion {
  margin-bottom: 1.5rem;
}

.media,
.numero {
  font-size: 1rem;
  color: #666;
}

/* Sección para puntuar */
.puntuar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

/* Input de puntuación */
.input-puntuacion {
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}

/* Botón para puntuar y obtener nueva cita */
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

/* Responsividad */
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
