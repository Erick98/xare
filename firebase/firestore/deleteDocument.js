import firebase_app from "../config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function deleteDocument(collectionName, documentId) {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
    return true; // Devuelve true si la eliminación fue exitosa
  } catch (e) {
    console.error("Error deleting document: ", e);
    return false; // Devuelve false si ocurrió un error
  }
}
