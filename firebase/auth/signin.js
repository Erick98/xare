import firebase_app from "../config";
import { getAuth, signInWithCustomToken } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signin(email, password) {
  const response = await fetch("/api/auth/create-token", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const { status, token } = await response.json();
  if (status === 200) {
    const userCredential = await signInWithCustomToken(auth, token);
    return userCredential;
  } else {
    return null;
  }
}
