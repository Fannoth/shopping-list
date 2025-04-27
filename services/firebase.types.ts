import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

/**
 * Reprezentuje pojedynczy produkt na liście zakupów.
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  store: string;
  purchased: boolean;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  ownerId: string;
  image?: string;
}

/**
 * Dane podstawowe zalogowanego użytkownika.
 */
export interface User {
  uid: string;
  email: string;
  displayName: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
}
