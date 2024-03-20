import { useFormStatus } from "react-dom";

export default function ButtonSubmit({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="h-[3rem] w-full bg-purple-500 px-4 hover:bg-purple-600"
      type="submit"
      disabled={pending}>
      {pending ? (
        <span className="font-bold text-white">Loading...</span>
      ) : (
        <span className="font-bold text-white">{children}</span>
      )}
    </button>
  );
}
