import firebase_app from "../config";
import { getFirestore, query, where, collection } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default function getWhereListRt(
  collectionName,
  field,
  condition,
  value
) {
  const q = query(
    collection(db, collectionName),
    where(field, condition, value)
  );
  return q;
}
