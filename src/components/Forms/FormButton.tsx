export default function FormButton({ children, ...props }: any) {
  return (
    <button
      className={`${
        props.primary
          ? "bg-zinc-200 hover:bg-zinc-400 text-black"
          : "bg-zinc-900 hover:bg-zinc-800 text-zinc-500"
      }  text-sm py-2 px-4 rounded-lg mt-3 mr-4 disabled:opacity-50 disabled:cursor-wait`}
      {...props}
    >
      {children}
    </button>
  );
}
