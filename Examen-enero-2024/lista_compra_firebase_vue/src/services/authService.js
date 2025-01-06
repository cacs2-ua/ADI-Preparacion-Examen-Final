import { auth } from '../config/firebaseConfig.js';
import { addUsuario } from '../repositories/usuarioRepository.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'; 
// NUEVO: Se importa updateProfile para poder asignar displayName en el perfil de Firebase.


// MODIFICADO: Se añade el parámetro "username"
const registrarUsuario = async (username, email, password) => {
  try {
    let cred = await createUserWithEmailAndPassword(auth, email, password)

    // NUEVO: Actualizar el perfil del usuario con el displayName
    await updateProfile(cred.user, { displayName: username })

    // Guardar en "usuarios" el email y el displayName
    await addUsuario(cred.user.uid, cred.user.email, username)

    return cred
  }
  catch (error) {
    console.log(error)
    throw error // NUEVO: Lanzamos el error para que se pueda gestionar en el componente
  }
};

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logout = () => {
  return signOut(auth);
};

export { registrarUsuario, login, logout };
