import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebase_app from "../config";

const storage = getStorage(firebase_app);

export default async function uploadFile(path, file) {
  const timestamp = new Date().getTime();

  const storageRef = ref(storage, `${path}/${timestamp}-${file.name}`);
  let uploadTask = uploadBytesResumable(storageRef, file);
  let result = null;
  let error = null;
  try {
    result = await uploadTask;
    let downloadURL = await getDownloadURL(result.ref);
    result.downloadURL = downloadURL;
  } catch (e) {
    error = e;
  }
  return { result, error };
}
