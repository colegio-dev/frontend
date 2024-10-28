
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import 'firebase/firestore';


/* const firebaseConfig = {
  apiKey: "AIzaSyANtEspivOFRGNptiCAh4fAm7Fr63Hpdwc",
  authDomain: "novedades-prevencion.firebaseapp.com",
  projectId: "novedades-prevencion",
  storageBucket: "novedades-prevencion.appspot.com",
  messagingSenderId: "275564188826",
  appId: "1:275564188826:web:af68145b033e61ae9f3b23"
}; */
const firebaseConfig = {
  apiKey: "AIzaSyAX4WuTio-ERViKqciwKl8I1jPcVkvL4Kc",
  authDomain: "novedades-identificaciones.firebaseapp.com",
  projectId: "novedades-identificaciones",
  storageBucket: "novedades-identificaciones.appspot.com",
  messagingSenderId: "69639742662",
  appId: "1:69639742662:web:37171383991b0de74a63c7"
};


const app = initializeApp(firebaseConfig)


export const storage = getStorage(app)

export async function upLoadFile(file) {
  const storageRef = ref(storage, `identificaciones/${v4()}`)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}

export async function upLoadFileUser(file) {
  const storageRef = ref(storage, `user/${v4()}`)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}


