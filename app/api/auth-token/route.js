import admin from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  const firestore = admin.firestore();
  const auth = admin.auth();
  const { username, password } = await req.json();

  if (username && password) {
    const user = await firestore
      .collection("users")
      .where("username", "==", username)
      .where("password", "==", password)
      .get();
    if (user.docs.length > 0) {
      const user_id = user.docs[0].id;
      const token = await auth.createCustomToken(user_id);
      return NextResponse.json({
        status: 200,
        token,
        message: "User logged",
      });
    } else {
      return NextResponse.json({
        status: 502,
        message: "Usuario o contraseña incorrecto",
      });
    }
  }
}
