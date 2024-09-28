import firebase_app from "../config";
import {
  getFirestore,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getWhereList(
  collectionName,
  field,
  condition,
  value
) {
  const q = query(
    collection(db, collectionName),
    where(field, condition, value)
  );
  const items = await getDocs(q);
  return items;
}
