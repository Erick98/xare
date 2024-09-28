import firebase_app from "../config";
import { getFirestore, query, where, collection } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default function getDataRt(collectionName) {
  const q = collection(db, collectionName);
  return q;
}
