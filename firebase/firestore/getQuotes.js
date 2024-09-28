import firebase_app from "../config";
import {
  getFirestore,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default function getQuotes(site) {
  const q = query(collection(db, "quotes"), where("site", "==", site));
  return q;
}
