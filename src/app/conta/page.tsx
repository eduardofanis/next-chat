"use client";
import Header from "@/components/Header/Header";
import ProtectedRoute from "@/components/Interface/ProtectedRoute";
import Image from "next/image";
import React from "react";
import { getCookie } from "cookies-next";

export default function Conta() {
  const avatar = getCookie("avatar");
  const nome = getCookie("nome");

  return (
    <ProtectedRoute>
      <div className="sm:w-96 ">
        <Header account={true} title="Sua conta" />
        <div className="grid justify-center text-center">
          {avatar && typeof avatar === "string" && (
            <Image src={avatar} alt="Foto de perfil" width={128} height={128} />
          )}
          <h2 className="mt-5 text-xl">{nome}</h2>
        </div>
      </div>
    </ProtectedRoute>
  );
}
