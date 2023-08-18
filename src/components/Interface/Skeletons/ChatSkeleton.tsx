import { CaretLeft, PaperPlaneRight } from "@phosphor-icons/react";
import Link from "next/link";

export default function ChatSkeleton() {
  return (
    <div className="sm:w-96 h-full flex flex-col relative shadow animate-pulse">
      <div className="flex items-center gap-4 border-b border-zinc-800 pb-3 mb-3">
        <Link href="/">
          <CaretLeft size={20} color="#ccc" />
        </Link>
        <div className="w-8 h-8 bg-zinc-600 rounded-full"></div>
        <div className="w-24 h-4 bg-zinc-600 rounded-full"></div>
      </div>
      <div className="border-b pb-5 mb-5 border-zinc-800 h-[calc(100%-79px)] overflow-y-hidden flex flex-col-reverse ">
        <div className="flex flex-col-reverse gap-2">
          <div className="place-self-end bg-zinc-600 w-28 h-14 rounded-2xl rounded-br-none"></div>
          <div className="place-self-start bg-zinc-600 w-28 h-14 rounded-2xl rounded-bl-none"></div>
          <div className="place-self-end bg-zinc-600 w-36 h-14 rounded-2xl rounded-br-none"></div>
          <div className="place-self-end bg-zinc-600 w-28 h-14 rounded-2xl rounded-br-none"></div>
          <div className="place-self-start bg-zinc-600 w-24 h-14 rounded-2xl rounded-bl-none"></div>
          <div className="place-self-end bg-zinc-600 w-32 h-14 rounded-2xl rounded-br-none"></div>
          <div className="place-self-start bg-zinc-600 w-40 h-14 rounded-2xl rounded-bl-none"></div>
          <div className="place-self-end bg-zinc-600 w-32 h-14 rounded-2xl rounded-br-none"></div>
          <div className="place-self-start bg-zinc-600 w-28 h-14 rounded-2xl rounded-bl-none"></div>
          <div className="place-self-end bg-zinc-600 w-36 h-14 rounded-2xl rounded-br-none"></div>
          <div className="place-self-end bg-zinc-600 w-28 h-14 rounded-2xl rounded-br-none"></div>
          <div className="place-self-start bg-zinc-600 w-24 h-14 rounded-2xl rounded-bl-none"></div>
          <div className="place-self-end bg-zinc-600 w-32 h-14 rounded-2xl rounded-br-none"></div>
          <div className="place-self-start bg-zinc-600 w-28 h-14 rounded-2xl rounded-bl-none"></div>
          <div className="place-self-end bg-zinc-600 w-32 h-14 rounded-2xl rounded-br-none"></div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="bg-zinc-900  w-full h-10 mr-5 py-2 px-3 rounded-lg border-solid border border-zinc-800"></div>
        <div>
          <PaperPlaneRight size={24} color="#8a8a8a" />
        </div>
      </div>
    </div>
  );
}
