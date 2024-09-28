import firebase_app from "../config";
import {
  getFirestore,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getOutstanding() {
  const q = query(
    collection(db, "pys"),
    where("standout", "==", "Destacado"),
    where("availability", "==", "Disponible")
  );
  const items = await getDocs(q);
  const data = items.docs.map((item) => ({ ...item.data(), id: item.id }));
  return data;
}
