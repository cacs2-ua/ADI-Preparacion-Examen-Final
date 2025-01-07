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

/**
 * Puntúa una cita actualizando su media de puntuaciones y el número de puntuaciones.
 * @param {string} id - ID del documento de la cita en Firestore.
 * @param {number} puntuacion - Puntuación otorgada (entre 0 y 10).
 * @returns {Promise<void>}
 */
export async function puntuarCita(id, puntuacion) {
  try {
    // 1. Referencia al documento específico de la cita
    const citaDocRef = doc(db, 'Citas', id);

    // 2. Obtener el documento actual
    const citaDoc = await getDoc(citaDocRef);

    if (!citaDoc.exists()) {
      throw new Error('La cita no existe');
    }

    const data = citaDoc.data();
    const mediaAnterior = data.puntuacionMedia || 0;
    const numeroAnterior = data.numeroDePuntuaciones || 0;

    // 3. Calcular la nueva media
    const nuevaMedia = (mediaAnterior * numeroAnterior + puntuacion) / (numeroAnterior + 1);
    const nuevoNumero = numeroAnterior + 1;

    // 4. Actualizar el documento en Firestore
    await updateDoc(citaDocRef, {
      puntuacionMedia: nuevaMedia,
      numeroDePuntuaciones: nuevoNumero,
    });

    console.log(`Cita ${id} puntuada con éxito. Nueva media: ${nuevaMedia.toFixed(2)}`);
  } catch (error) {
    console.error('Error al puntuar la cita:', error);
    throw error;
  }
}
