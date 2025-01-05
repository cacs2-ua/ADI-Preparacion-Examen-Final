import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebaseConfig.js'

/**
 * Devuelve una cita aleatoria de la colección "Citas" en Firestore.
 * La colección contiene documentos con campos "texto" y "autor".
 * @returns {Promise<{ texto: string, autor: string }>} Objeto con la cita y su autor.
 */
export async function getCitaAleatoria() {
  try {
    // 1. Referencia a la colección "Citas"
    const citasCollectionRef = collection(db, 'Citas')

    // 2. Obtenemos TODOS los documentos (en entornos grandes se recomienda un enfoque distinto)
    const snapshot = await getDocs(citasCollectionRef)

    // 3. Transformamos los documentos en un array de objetos
    const citas = snapshot.docs.map((doc) => doc.data())

    // 4. Seleccionamos uno al azar
    if (citas.length === 0) {
      throw new Error('No hay citas disponibles en la colección "Citas"')
    }
    const randomIndex = Math.floor(Math.random() * citas.length)
    return citas[randomIndex]

  } catch (error) {
    console.error('Error obteniendo cita aleatoria:', error)
    throw error
  }
}
