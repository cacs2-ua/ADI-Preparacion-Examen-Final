import { auth } from '@/config/firebaseConfig'
import { addUsuario } from '@/repositories/usuarioRepository'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'

async function registrarUsuario(username, email, password) {
  try {
    let cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName: username })
    await addUsuario(cred.user.uid, cred.user.email, username)
    return cred
  } catch (error) {
    throw error
  }
}

function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

function logout() {
  return signOut(auth)
}

export { registrarUsuario, login, logout }
