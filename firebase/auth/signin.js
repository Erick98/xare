import firebase_app from "../config";
import { getAuth, signInWithCustomToken } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signin(username, password) {
  const response = await fetch("/api/auth-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const { status, token } = await response.json();
  if (status === 200) {
    const userCredential = await signInWithCustomToken(auth, token);
    return userCredential;
  } else {
    return null;
  }
}
