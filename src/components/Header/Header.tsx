import React from "react";
import { UserContext } from "@/app/UserContext";
import { House, SignOut } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import { getCookie } from "cookies-next";

export default function Header({
  title,
  home,
  account,
}: {
  title: string;
  home?: boolean;
  account?: boolean;
}) {
  const User = React.useContext(UserContext);
  const avatar = getCookie("avatar");

  if (User && User.login === true) {
    return (
      <div className="flex w-full border-solid border-b border-zinc-900 pb-5 mb-10 justify-center place-content-between relative">
        {!home && (
          <Link href="/" className="absolute left-0">
            <House size={20} color="#ccc" />
          </Link>
        )}
        <h1 className="text-zinc-400">{title}</h1>
        {!account && avatar ? (
          <Link href="/conta" className="absolute right-0">
            {typeof avatar === "string" && (
              <Image src={avatar} alt="Foto de perfil" width={24} height={24} />
            )}
          </Link>
        ) : (
          <button
            onClick={() => User.userLogout()}
            className="absolute right-0"
          >
            <SignOut size={20} color="red" />
          </button>
        )}
      </div>
    );
  }
  return (
    <div className="flex w-full justify-center border-solid border-b border-zinc-900 pb-5">
      <h1 className="text-zinc-400">{title}</h1>
    </div>
  );
}

export function HeaderLogin({ title }: { title: string }) {
  return (
    <div className="flex w-full justify-center border-solid border-b border-zinc-900 pb-5">
      <h1 className="text-zinc-400">{title}</h1>
    </div>
  );
}
