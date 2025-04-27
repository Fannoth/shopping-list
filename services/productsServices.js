import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  where,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db, auth } from './authServices';

const productsCol = collection(db, 'products');

export async function addProduct({ name, price, store }) {
  await addDoc(productsCol, {
    name,
    price,
    store,
    purchased: false,
    ownerId: auth.currentUser.uid,
    createdAt: serverTimestamp()
  });
}

export async function fetchMyProducts() {
  const user = auth.currentUser;
  if (!user) {
    return [];
  }
  const q = query(
    collection(db, 'products'),
    where('ownerId', '==', auth.currentUser.uid),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function togglePurchased(id, current) {
  const ref = doc(db, 'products', id);
  await updateDoc(ref, { purchased: !current });
}

export async function deleteProduct(id) {
  await deleteDoc(doc(db, 'products', id));
}
