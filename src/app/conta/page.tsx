"use client";
import Header from "@/components/Header/Header";
import ProtectedRoute from "@/components/Interface/ProtectedRoute";
import Image from "next/image";
import React from "react";

export default function Conta() {
  if (typeof window !== "undefined") {
    const avatar = window.localStorage.getItem("avatar");
    const nome = window.localStorage.getItem("nome");

    return (
      <ProtectedRoute>
        <div className="sm:w-96 ">
          <Header account={true} title="Sua conta" />
          <div className="grid justify-center text-center">
            {avatar && (
              <Image
                src={avatar}
                alt="Foto de perfil"
                width={128}
                height={128}
              />
            )}
            <h2 className="mt-5 text-xl">{nome}</h2>
          </div>
        </div>
      </ProtectedRoute>
    );
  }
  return <ProtectedRoute></ProtectedRoute>;
}
