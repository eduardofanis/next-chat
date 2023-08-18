"use client";
import useForm from "@/hooks/useForm";
import Footer from "@/components/Footer/Footer";
import ForgotPassword from "@/components/Forms/ForgotPassword";
import FormButton from "@/components/Forms/FormButton";
import { HeaderLogin } from "@/components/Header/Header";
import Button from "@/components/Interface/Button";
import Input from "@/components/Forms/Input";
import { USER_POST } from "@/api/api";
import useFetch from "@/hooks/useFetch";
import Error from "@/components/Interface/Error";
import React from "react";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const username = useForm();
  const password = useForm();

  const router = useRouter();

  const [cadastrado, setCadastrado] = React.useState(false);

  const { loading, error, request } = useFetch();

  async function handleSubmit(event: any) {
    event.preventDefault();

    const { url, options } = USER_POST({
      nome: username.value,
      senha: password.value,
    });
    const response = await request(url, options);
    if (response) {
      setCadastrado(true);
      router.push("/conta/login");
    }
  }

  return (
    <div className="flex flex-col h-full place-content-between sm:w-96">
      <HeaderLogin title="Cadastre-se" />
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <Input label="Usuário" type="text" name="username" {...username} />
          <Input label="Senha" type="password" name="senha" {...password} />
          <div className="mt-3">
            {loading ? (
              <FormButton primary="true" disabled>
                Cadastrando...
              </FormButton>
            ) : (
              <FormButton primary="true">Cadastrar</FormButton>
            )}
            <Button href="./login">Entrar</Button>
          </div>
          {cadastrado && (
            <span className="text-sm text-green-500 mt-2">
              Usuário cadastrado com sucesso.
            </span>
          )}
          <Error error={error} />
        </form>
        <ForgotPassword />
      </div>
      <Footer />
    </div>
  );
}
