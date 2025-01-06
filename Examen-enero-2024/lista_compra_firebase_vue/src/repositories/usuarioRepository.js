import { setDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebaseConfig'

// MODIFICADO: Se incluye "displayName" para guardar el nombre de usuario (username) en Firestore
function addUsuario(uid, email, displayName) {
    return setDoc(doc(db, "usuarios", uid), {
        email: email,
        displayName: displayName // NUEVO
    }, { merge: true })
}

export { addUsuario }
