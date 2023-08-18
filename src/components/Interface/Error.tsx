const Error = ({ error }: any) => {
  if (!error) return null;
  return <span className="text-sm text-red-600 mt-2">{error}.</span>;
};

export default Error;
