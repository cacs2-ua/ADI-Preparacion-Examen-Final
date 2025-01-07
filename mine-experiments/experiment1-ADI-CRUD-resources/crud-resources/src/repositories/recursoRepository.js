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

async function getRecursos() {
  if (!auth.currentUser) throw new Error('usuario no autentificado')
  let q = query(collection(db, 'persianas'), where('uid', '==', auth.currentUser.uid))
  let snapshot = await getDocs(q)
  return snapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })
}

async function addRecurso(obj) {
  // obj = { texto, altura, nombreAutor }
  if (!auth.currentUser) throw new Error('usuario no autentificado')
  let fechaActual = new Date()
  let nuevo = {
    uid: auth.currentUser.uid,
    fecha: fechaActual.toLocaleDateString(),
    hora: fechaActual.toLocaleTimeString(),
    pesaje: obj.pesaje,
    altura: obj.altura,
    edad: obj.edad,
    nacimiento: obj.nacimiento,
    horaNacimiento: obj.horaNacimiento,
    nombreAutor: obj.nombreAutor
  }
  let newRef = await addDoc(collection(db, 'persianas'), nuevo)
  return { id: newRef.id, ...nuevo }
}

async function updateRecurso(recursoId, campos) {
  // campos: { texto: "...", nombreAutor: "...", ... }
  if (!auth.currentUser) throw new Error('usuario no autentificado')
  let recursoRef = doc(db, 'persianas', recursoId)
  let snap = await getDoc(recursoRef)
  if (!snap.exists()) throw new Error('El recurso no existe')
  if (snap.data().uid !== auth.currentUser.uid) throw new Error('No tienes permisos')

  // Actualizamos fecha/hora a la actual
  let fechaActual = new Date()
  let cambio = {
    fecha: fechaActual.toLocaleDateString(),
    hora: fechaActual.toLocaleTimeString(),
    ...campos
  }
  await setDoc(recursoRef, cambio, { merge: true })
}

async function deleteRecurso(recursoId) {
  if (!auth.currentUser) throw new Error('usuario no autentificado')
  let recursoRef = doc(db, 'persianas', recursoId)
  let snap = await getDoc(recursoRef)
  if (!snap.exists()) throw new Error('El recurso no existe')
  if (snap.data().uid !== auth.currentUser.uid) throw new Error('No tienes permisos')
  await deleteDoc(recursoRef)
}

async function getRecursoById(recursoId) {
  if (!auth.currentUser) throw new Error('usuario no autentificado')
  let recursoRef = doc(db, 'persianas', recursoId)
  let snap = await getDoc(recursoRef)
  if (!snap.exists()) {
    throw new Error('El recurso no existe')
  }
  if (snap.data().uid !== auth.currentUser.uid) {
    throw new Error('No tienes permisos')
  }
  return { id: snap.id, ...snap.data() }
}

export {
  getRecursos,
  addRecurso,
  updateRecurso,
  deleteRecurso,
  getRecursoById
}
