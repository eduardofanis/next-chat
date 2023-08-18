"use client";
import { CHAT_GET, MESSAGE_POST, USER_GET } from "@/api/api";
import FormButton from "@/components/Forms/FormButton";
import Error from "@/components/Interface/Error";
import ProtectedRoute from "@/components/Interface/ProtectedRoute";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CaretLeft, PaperPlaneRight } from "@phosphor-icons/react";
import React from "react";
import { relativeDate } from "@/hooks/relativeDate";
import ChatSkeleton from "@/components/Interface/Skeletons/ChatSkeleton";

interface IMessages {
  key: string;
  createdAt: string;
  isRemetente: boolean;
  texto: string;
}

interface IUser {
  _id: string;
  nome: string;
  avatar: string;
}

export default function Conversa() {
  const [chat, setChat] = React.useState<IMessages[]>([]);
  const [user, setUser] = React.useState<IUser[]>([]);
  const [mensagem, setMensagem] = React.useState("");
  const { data, loading, error, request } = useFetch();
  const { slug } = useParams();

  const fetchChat = React.useCallback(async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { url, options } = CHAT_GET(token, String(slug));
      const response = await request(url, options);
      if (response) {
        const formated = response.json.flatMap((message: IMessages) => [
          {
            key: message.createdAt,
            createdAt: relativeDate(message.createdAt),
            isRemetente: message.isRemetente,
            texto: message.texto,
          },
        ]);
        setChat(formated);
      }
    }
  }, [request, slug]);

  React.useEffect(() => {
    async function fetchUser() {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { url, options } = USER_GET(token, String(slug));
        const response = await request(url, options);
        if (response) {
          setUser(response.json);
        }
      }
    }
    fetchUser();
    fetchChat();
  }, [request, slug, fetchChat]);

  async function handleSubmit(event: any) {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    if (token && mensagem && !loading) {
      const { url, options } = MESSAGE_POST(token, String(slug), {
        texto: mensagem,
      });
      const response = await request(url, options);
      setMensagem("");
      if (response && response.response && response.response.ok) {
        fetchChat();
      }
    }
  }

  if (error) return <Error error={error} />;
  if (data && user && user.length > 0 && chat)
    return (
      <ProtectedRoute>
        <div className="sm:w-96 h-full flex flex-col relative">
          <div className="flex items-center gap-4 border-b border-zinc-800 pb-3 mb-3">
            <Link href="/">
              <CaretLeft size={20} color="#ccc" />
            </Link>
            {user[0].avatar && (
              <Image
                src={user[0].avatar}
                alt="User Avatar"
                width="32"
                height="32"
              />
            )}
            <h2>{user[0]?.nome}</h2>
          </div>

          <div className="border-b pb-5 mb-5 border-zinc-800 h-[calc(100%-79px)] overflow-y-auto flex flex-col-reverse">
            <div className="flex flex-col-reverse place-content-end">
              {chat.length > 0 &&
                chat.map((message) => (
                  <div className="grid" key={message.key}>
                    <p
                      className={`${
                        !message.isRemetente
                          ? "bg-zinc-900 text-left rounded-bl-none"
                          : "bg-zinc-400 text-black text-right place-self-end rounded-br-none"
                      } rounded-2xl w-fit py-2 px-3 mt-2 `}
                    >
                      {message.texto}
                      <span className="text-xs block text-zinc-600">
                        {message.createdAt}
                      </span>
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="">
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                id="mensagem"
                type="text"
                name="texto"
                value={mensagem}
                onChange={(event) => setMensagem(event.target.value)}
                className="bg-zinc-900 text-zinc-400 w-full h-10 mr-5 py-2 px-3 rounded-lg border-solid border border-zinc-800 hover:border-zinc-400"
              />
              <button>
                <PaperPlaneRight size={24} color="#ccc" />
              </button>
            </form>
          </div>
        </div>
      </ProtectedRoute>
    );
  return (
    <ProtectedRoute>
      <ChatSkeleton />
    </ProtectedRoute>
  );
}
