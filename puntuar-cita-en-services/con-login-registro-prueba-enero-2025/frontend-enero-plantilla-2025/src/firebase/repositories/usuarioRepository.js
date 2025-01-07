// NUEVO FICHERO: src/firebase/repositories/usuarioRepository.js

import { db } from '../config/firebaseConfig.js'
import { doc, setDoc } from 'firebase/firestore'

/*
  Guarda o actualiza la información del usuario (por ejemplo, su displayName)
  en la colección "Users" con el UID como identificador.
*/
export async function saveUserData(uid, displayName, email) {
  const userRef = doc(db, 'Users', uid)
  await setDoc(userRef, {
    displayName: displayName,
    email: email
  }, { merge: true })
}
