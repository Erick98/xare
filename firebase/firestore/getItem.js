import firebase_app from "../config";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(firebase_app);

export const getItem = async (collectionName, docId) => {
  try {
    const docRef = await getDoc(doc(db, collectionName, docId));
    if (docRef.exists()) {
      return { ...docRef.data(), id: docRef.id };
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
