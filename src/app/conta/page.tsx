"use client";
import Header from "@/components/Header/Header";
import ProtectedRoute from "@/components/Interface/ProtectedRoute";
import Image from "next/image";
import React from "react";
import { getCookie } from "cookies-next";
import NonSSRWrapper from "@/components/Interface/NonSSRWrapper";

export default function Conta() {
  const [avatar, setAvatar] = React.useState("");
  const [nome, setNome] = React.useState("");

  React.useEffect(() => {
    const avatar = getCookie("avatar");
    if (avatar && typeof avatar === "string") {
      setAvatar(avatar);
    } else {
      setAvatar("");
    }
    const nome = getCookie("nome");
    if (nome && typeof nome === "string") {
      setNome(nome);
    } else {
      setNome("");
    }
  }, []);

  if (avatar && nome)
    return (
      <ProtectedRoute>
        <div className="sm:w-96 ">
          <Header account={true} title="Sua conta" />
          <div className="grid justify-center text-center">
            <Image
              priority
              src={avatar}
              alt="Foto de perfil"
              width={128}
              height={128}
            />
            <h2 className="mt-5 text-xl">{nome}</h2>
          </div>
        </div>
      </ProtectedRoute>
    );
  return (
    <ProtectedRoute>
      <div className="sm:w-96 ">
        <Header account={true} title="Sua conta" />
      </div>
    </ProtectedRoute>
  );
}
