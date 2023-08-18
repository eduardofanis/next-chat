"use client";
import React from "react";
import useForm from "@/hooks/useForm";
import Footer from "@/components/Footer/Footer";
import ForgotPassword from "@/components/Forms/ForgotPassword";
import FormButton from "@/components/Forms/FormButton";
import Header, { HeaderLogin } from "@/components/Header/Header";
import Button from "@/components/Interface/Button";
import Input from "@/components/Forms/Input";
import { UserContext } from "@/app/UserContext";
import Error from "@/components/Interface/Error";

export default function Cadastro() {
  const username = useForm();
  const password = useForm();

  const User = React.useContext(UserContext);

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      User?.userLogin(username.value, password.value);
    }
  }

  return (
    <div className="flex flex-col h-full place-content-between sm:w-96">
      <HeaderLogin title="Fazer login" />
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <Input label="Usuário" type="text" name="username" {...username} />
          <Input label="Senha" type="password" name="senha" {...password} />
          <div className="mt-3">
            {User?.loading ? (
              <FormButton primary="true" disabled>
                Entrando...
              </FormButton>
            ) : (
              <FormButton primary="true">Entrar</FormButton>
            )}
            <Button href="./cadastro">Cadastre-se</Button>
          </div>
          <Error error={User?.error && "Dados incorretos"} />
        </form>
        <ForgotPassword />
      </div>
      <Footer />
    </div>
  );
}
