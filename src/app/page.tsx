"use client";
import ProtectedRoute from "@/components/Interface/ProtectedRoute";
import React from "react";
import useFetch from "@/hooks/useFetch";
import { MESSAGES_GET, MESSAGE_POST } from "@/api/api";
import Error from "@/components/Interface/Error";
import Image from "next/image";
import Link from "next/link";
import { relativeDate } from "@/hooks/relativeDate";
import Header from "@/components/Header/Header";
import { ChatText, PaperPlaneRight, X } from "@phosphor-icons/react";
import MessagesSkeleton from "@/components/Interface/Skeletons/MessagesSkeleton";

interface IMessages {
  _id: string;
  nome: string;
  avatar: string;
  ultimaMensagem: string | null;
  dataUltimaMensagem: string | null;
}

export default function Home() {
  const [messages, setMessages] = React.useState<IMessages[]>([]);
  const [modal, setModal] = React.useState(false);
  const [nome, setNome] = React.useState("");
  const [mensagem, setMensagem] = React.useState("");
  const UsersMessages = useFetch();
  const { request } = UsersMessages;

  const NewMessage = useFetch();

  const fetchMessages = React.useCallback(async () => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { url, options } = MESSAGES_GET(token);
        const response = await request(url, options);
        if (response) {
          const formated = response.json.flatMap((message: IMessages) => [
            {
              _id: message._id,
              nome: message.nome,
              avatar: message.avatar,
              ultimaMensagem: message.ultimaMensagem,
              dataUltimaMensagem: message.dataUltimaMensagem
                ? relativeDate(message.dataUltimaMensagem)
                : null,
            },
          ]);
          setMessages(formated);
        }
      }
    }
  }, [request]);

  React.useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  async function handleSubmit(event: any) {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    if (token && nome && mensagem) {
      const { url, options } = MESSAGE_POST(token, nome, {
        texto: mensagem,
      });
      const response = await NewMessage.request(url, options);
      setNome("");
      setMensagem("");
      if (response && response.response && response.response.ok) {
        setModal(false);
        fetchMessages();
      }
    }
  }

  if (UsersMessages.error) return <Error error={UsersMessages.error} />;
  if (UsersMessages.data && messages.length < 1)
    return (
      <ProtectedRoute>
        <div className="h-full">
          <Header home="true">Suas conversas</Header>
          <p>Nenhuma mensagem encontrada.</p>
        </div>
      </ProtectedRoute>
    );
  if (UsersMessages.data && messages.length > 1)
    return (
      <ProtectedRoute>
        <div className="relative h-full sm:w-96">
          <div className={`${modal && "opacity-10"}`}>
            <Header home="true">Suas conversas</Header>
            <div>
              {messages
                .filter((message) => message.ultimaMensagem)
                .map((filteredMessage) => (
                  <Link
                    href={`/mensagens/${filteredMessage.nome}`}
                    key={filteredMessage._id}
                    className="grid grid-cols-messages sm:w-96 mb-4 pb-4 border-b border-zinc-900 space-x-4 justify-start items-center"
                  >
                    <Image
                      src={filteredMessage.avatar}
                      alt=""
                      width="48"
                      height="48"
                      className="row-span-2"
                    />
                    <h2>{filteredMessage.nome}</h2>
                    <span className="text-sm text-zinc-600">
                      {filteredMessage.dataUltimaMensagem}
                    </span>
                    <p className="text-sm text-zinc-300">
                      {filteredMessage.ultimaMensagem}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
          {!modal && (
            <button
              onClick={() => setModal(!modal)}
              className={`absolute bottom-0 right-0 bg-zinc-300 p-3 rounded-full`}
            >
              <ChatText size={24} color="black" />
            </button>
          )}
          {modal && (
            <div className="text-center text-zinc-500 absolute bottom-20">
              <div className="mb-5 pb-5 border-b border-zinc-900 relative">
                <h2>
                  Nova conversa
                  <button
                    className="absolute right-0 top-1"
                    onClick={() => setModal(false)}
                  >
                    <X size={20} />
                  </button>
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="text-left">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  className="bg-zinc-900 text-zinc-400 w-full h-10 mr-5 py-2 px-3 rounded-lg border-solid border border-zinc-800 hover:border-zinc-400 mt-1 mb-5"
                />
                <label htmlFor="mensagem">Mensagem</label>
                <input
                  type="text"
                  name="mensagem"
                  id="mensagem"
                  value={mensagem}
                  onChange={(event) => setMensagem(event.target.value)}
                  className="bg-zinc-900 text-zinc-400 w-full h-10 mr-5 py-2 px-3 rounded-lg border-solid border border-zinc-800 hover:border-zinc-400 mt-1 mb-2"
                />
                <button className="absolute -bottom-20 right-0 bg-zinc-300 p-3 rounded-full">
                  <PaperPlaneRight size={24} color="black" />
                </button>
                <Error error={NewMessage.error} />
              </form>
            </div>
          )}
        </div>
      </ProtectedRoute>
    );
  return (
    <ProtectedRoute>
      <MessagesSkeleton />
    </ProtectedRoute>
  );
}
