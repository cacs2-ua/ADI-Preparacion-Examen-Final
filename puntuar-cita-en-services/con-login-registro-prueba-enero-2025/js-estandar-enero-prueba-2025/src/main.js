// src/main.js

import './style.css';
import { getCitaAleatoria } from './firebase/repositories/citasRepository.js';

// Función para actualizar la cita en la interfaz
async function actualizarCita() {
  const textoCita = document.getElementById('cita-texto');
  const autorCita = document.getElementById('cita-autor');

  try {
    const cita = await getCitaAleatoria();
    textoCita.textContent = cita.texto;
    autorCita.textContent = `— ${cita.autor}`;
  } catch (error) {
    textoCita.textContent = 'Error al obtener la cita.';
    autorCita.textContent = '';
  }
}

// Evento para el botón "Obtener nueva cita"
document.getElementById('nueva-cita').addEventListener('click', actualizarCita);

// Obtener una cita al cargar la página
window.addEventListener('DOMContentLoaded', actualizarCita);
