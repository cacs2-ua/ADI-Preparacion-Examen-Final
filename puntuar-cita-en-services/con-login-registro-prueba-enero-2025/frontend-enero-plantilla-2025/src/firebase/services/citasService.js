// NUEVO FICHERO: firebase/services/citasService.js

import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebaseConfig.js'

/**
 * Puntúa una cita actualizando su media de puntuaciones y el número de puntuaciones.
 * @param {string} id - ID del documento de la cita en Firestore.
 * @param {number} puntuacion - Puntuación otorgada (entre 0 y 10).
 * @returns {Promise<void>}
 */
export async function puntuarCita(id, puntuacion) {
  try {
    const citaDocRef = doc(db, 'Citas', id)
    const citaDoc = await getDoc(citaDocRef)

    if (!citaDoc.exists()) {
      throw new Error('La cita no existe')
    }

    const data = citaDoc.data()
    const mediaAnterior = data.puntuacionMedia || 0
    const numeroAnterior = data.numeroDePuntuaciones || 0

    const nuevaMedia = (mediaAnterior * numeroAnterior + puntuacion) / (numeroAnterior + 1)
    const nuevoNumero = numeroAnterior + 1

    await updateDoc(citaDocRef, {
      puntuacionMedia: nuevaMedia,
      numeroDePuntuaciones: nuevoNumero,
    })

    console.log(`Cita ${id} puntuada con éxito. Nueva media: ${nuevaMedia.toFixed(2)}`)
  } catch (error) {
    console.error('Error al puntuar la cita:', error)
    throw error
  }
}
