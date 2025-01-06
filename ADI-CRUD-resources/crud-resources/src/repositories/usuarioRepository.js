import { setDoc, doc } from 'firebase/firestore'
import { db } from '@/config/firebaseConfig'

function addUsuario(uid, email, displayName) {
  return setDoc(doc(db, 'usuarios', uid), {
    email: email,
    displayName: displayName
  }, { merge: true })
}

export { addUsuario }
