import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, addDoc, query, where, getDocs, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'pui-hw6-55a81.firebaseapp.com',
  projectId: 'pui-hw6-55a81',
  storageBucket: 'pui-hw6-55a81.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: 'G-L0HSX5N12X',
};

export const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);

export const insertDocument = async (owner, name, img_bg, img_top, quan, color, size, price, time) => {
  console.log(owner, name, img_bg, img_top, quan, color, size, price, time);
  const data = {
    owner,
    name,
    img_bg,
    img_top,
    quan,
    color,
    size,
    price,
    time,
  };
  let docRef = await addDoc(collection(db, 'ShoppingCartItems'), data);
  console.log(docRef.id); // => 亂數值
};

export const getUserDocuments = async (userId) => {
  const q = query(collection(db, 'ShoppingCartItems'), where('owner', '==', userId), orderBy('time', 'desc'));
  const querySnapshot = await getDocs(q);
  let returnArr = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const id_obj = { id: doc.id };
    const data_obj = doc.data();
    const new_obj = { ...id_obj, ...data_obj };
    returnArr.push(new_obj);
    console.log(new_obj);
  });

  return returnArr;
};

export const updateDocumentQuan = async (id, quan) => {
  const shirtRef = doc(db, 'ShoppingCartItems', id);
  await updateDoc(shirtRef, {
    quan: String(quan),
  });
};

export const deleteDocument = async (id) => {
  const shirtRef = doc(db, 'ShoppingCartItems', id);
  await deleteDoc(shirtRef);
};
