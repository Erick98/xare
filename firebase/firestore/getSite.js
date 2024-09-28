import firebase_app from "../config";
import {
  getFirestore,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getSite(subdomain) {
  const q = query(collection(db, "sites"), where("subdomain", "==", subdomain));
  const items = await getDocs(q);
  const item = items.docs[0];
  if (item) {
    return { ...item.data(), id: item.id };
  } else {
    return null;
  }
}
