export default function Button({
  children,
  primary,
  href,
  disabled,
}: {
  children: any;
  primary?: boolean;
  href: string;
  disabled?: boolean;
}) {
  return (
    <>
      {primary && (
        <a
          type="submit"
          href={href}
          className="bg-zinc-200 hover:bg-zinc-400 text-black text-sm py-2 px-4 rounded-lg mt-3 mr-4 disabled:opacity-50 disabled:cursor-wait"
        >
          {children}
        </a>
      )}
      {!primary && (
        <a
          type="submit"
          href={href}
          className="bg-zinc-900 hover:bg-zinc-800 text-zinc-500 text-sm py-2 px-4 rounded-lg mt-3 disabled:opacity-50 disabled:cursor-wait"
        >
          {children}
        </a>
      )}
    </>
  );
}
