const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  onBlur,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: ({ target }: { target: any }) => void;
  error: null;
  onBlur: () => boolean;
}) => {
  return (
    <>
      <label htmlFor={name} className="text-zinc-600 mt-3">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="bg-zinc-900 text-zinc-400 w-full h-10 py-2 px-3 rounded-lg border-solid border border-zinc-800 hover:border-zinc-400"
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
};

export default Input;
