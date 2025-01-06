import { db, auth } from '@/config/firebaseConfig'
import {
  doc,
  collection,
  query,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  where
} from 'firebase/firestore'

async function getAnuncios() {
  if (!auth.currentUser) throw new Error('usuario no autentificado')
  let q = query(collection(db, 'anuncio'), where('uid', '==', auth.currentUser.uid))
  let snapshot = await getDocs(q)
  return snapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })
}

async function addAnuncio(anuncioData) {
  // anuncioData = { texto, nombreAutor }
  if (!auth.currentUser) throw new Error('usuario no autentificado')
  let fechaActual = new Date()
  let nuevo = {
    uid: auth.currentUser.uid,
    fecha: fechaActual.toLocaleDateString(),
    hora: fechaActual.toLocaleTimeString(),
    texto: anuncioData.texto,
    nombreAutor: anuncioData.nombreAutor
  }
  let newRef = await addDoc(collection(db, 'anuncio'), nuevo)
  return { id: newRef.id, ...nuevo }
}

async function updateAnuncio(anuncioId, campos) {
  // campos: { texto: "...", nombreAutor: "...", ... }
  if (!auth.currentUser) throw new Error('usuario no autentificado')
  let anuncioRef = doc(db, 'anuncio', anuncioId)
  let anuncioSnapshot = await getDoc(anuncioRef)
  if (!anuncioSnapshot.exists()) throw new Error('El anuncio no existe')
  if (anuncioSnapshot.data().uid !== auth.currentUser.uid) throw new Error('No tienes permisos')

  // la fecha y hora se actualizan siempre a la fecha/hora actual
  let fechaActual = new Date()
  let cambio = {
    fecha: fechaActual.toLocaleDateString(),
    hora: fechaActual.toLocaleTimeString(),
    ...campos
  }
  await setDoc(anuncioRef, cambio, { merge: true })
}

async function deleteAnuncio(anuncioId) {
  if (!auth.currentUser) throw new Error('usuario no autentificado')
  let anuncioRef = doc(db, 'anuncio', anuncioId)
  let anuncioSnapshot = await getDoc(anuncioRef)
  if (!anuncioSnapshot.exists()) throw new Error('El anuncio no existe')
  if (anuncioSnapshot.data().uid !== auth.currentUser.uid) throw new Error('No tienes permisos')

  await deleteDoc(anuncioRef)
}

async function getAnuncioById(anuncioId) {
  if (!auth.currentUser) throw new Error('usuario no autentificado')
  let anuncioRef = doc(db, 'anuncio', anuncioId)
  let anuncioSnap = await getDoc(anuncioRef)
  if (!anuncioSnap.exists()) {
    throw new Error('El anuncio no existe')
  }
  if (anuncioSnap.data().uid !== auth.currentUser.uid) {
    throw new Error('No tienes permisos')
  }
  return { id: anuncioSnap.id, ...anuncioSnap.data() }
}

export {
  getAnuncios,
  addAnuncio,
  updateAnuncio,
  deleteAnuncio,
  getAnuncioById
}
