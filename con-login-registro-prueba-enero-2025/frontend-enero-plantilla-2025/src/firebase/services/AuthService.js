// NUEVO FICHERO: src/firebase/services/AuthService.js

import { auth } from '../config/firebaseConfig.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from 'firebase/auth'
import { saveUserData } from '../repositories/usuarioRepository.js'

/*
  Registra un usuario con email y password. 
  Guarda adicionalmente el displayName y la info del usuario en Firestore.
*/
export async function registerUser(email, password, displayName) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user
  // Actualizamos el displayName en la parte de Auth
  await updateProfile(user, { displayName: displayName })
  // Guardamos datos del usuario también en Firestore
  await saveUserData(user.uid, displayName, email)
  return user
}

/*
  Inicia sesión con email y password.
*/
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

/*
  Cierra sesión del usuario actual.
*/
export async function logoutUser() {
  await signOut(auth)
}

/*
  Observa el estado de la sesión. 
  onAuthStateChanged se ejecuta cuando el usuario inicia/cierra sesión.
*/
export function observeAuthState(callback) {
  return onAuthStateChanged(auth, callback)
}
