// src/firebase/repositories/citasRepository.js

import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig.js';

/**
 * Devuelve una cita aleatoria de la colección "Citas" en Firestore.
 * La colección contiene documentos con campos "texto", "autor", "puntuacionMedia" y "numeroDePuntuaciones".
 * @returns {Promise<{ id: string, texto: string, autor: string, puntuacionMedia: number, numeroDePuntuaciones: number }>} Objeto con la cita, su autor, media de puntuaciones y número de puntuaciones.
 */
export async function getCitaAleatoria() {
  try {
    // 1. Referencia a la colección "Citas"
    const citasCollectionRef = collection(db, 'Citas');

    // 2. Obtenemos TODOS los documentos (en entornos grandes se recomienda un enfoque distinto)
    const snapshot = await getDocs(citasCollectionRef);

    // 3. Transformamos los documentos en un array de objetos con id
    const citas = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    // 4. Seleccionamos uno al azar
    if (citas.length === 0) {
      throw new Error('No hay citas disponibles en la colección "Citas"');
    }
    const randomIndex = Math.floor(Math.random() * citas.length);
    return citas[randomIndex];
  } catch (error) {
    console.error('Error obteniendo cita aleatoria:', error);
    throw error;
  }
}


