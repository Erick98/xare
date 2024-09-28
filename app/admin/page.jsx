"use client";
import { useAuthContext } from "@/context/AuthContext";

export default function Page() {
  const { user } = useAuthContext();

  console.log(user);
  return (
    <div>
      <h1>Panel de Administración</h1>
    </div>
  );
}
