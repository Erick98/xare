"use client";
import signout from "@/firebase/auth/signout";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    signout().then(() => {
      alert("Has cerrado sesión correctamente.");
      window.location.href = "/";
    });
  }, []);
  return (
    <>
      <div></div>
    </>
  );
}
