"use client";

// ** Nextjs
import { useRouter } from "next-nprogress-bar";

// ** React Imports
import { useState, useEffect, useRef, MouseEvent } from "react";

// ** Socket
import { socket } from "@/app/socket";
import Loading from "@/components/Loading";

export default function JoinPage() {
  const router = useRouter();
  const inputPinRef = useRef<HTMLInputElement>(null);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userData")!)
      : "";
  const userEmail = userData ? userData.email : null;
  const [userName, setUserName] = useState<string>(
    userEmail ? userEmail.split("@")[0] : "",
  );

  function joinRoom(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    router.push(`gameblock/${inputPinRef?.current?.value}`);
  }

  function handleSetName(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    setUserName(inputNameRef?.current?.value as string);
  }

  function handleSubmit() {
    setIsLoading(true);
  }

  useEffect(() => {
    socket.connect();

    socket.on("joinRoomError", (error) => {
      setError(error);
    });

    socket.on("joinedRoom", () => {
      setError("");
      handleSubmit();
    });

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Setting this property is necessary for some browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full w-full">
      <div className="flex h-full items-center justify-center">
        <main className="max-w-[320px] text-center">
          <h2 className="mb-4 text-3xl font-bold">Squiz</h2>
          <form
            className={`flex w-[300px] flex-col items-center justify-center gap-2.5 rounded ${isLoading ? "bg-transparent" : "bg-white shadow"} p-4`}>
            {isLoading && <Loading />}
            {!inputPinRef?.current?.value && (
              <>
                <input
                  ref={inputPinRef}
                  className="h-[44px] w-full rounded border border-slate-300 px-1.5 py-1 text-center font-bold text-black outline-none"
                  placeholder="Game PIN"
                  autoComplete="false"
                />
                <button
                  onClick={joinRoom}
                  className="h-[44px] w-full rounded bg-gray-700 px-4 font-bold text-white">
                  Enter
                </button>
                {error && <span className="font-bold text-[red]">{error}</span>}
              </>
            )}

            {inputPinRef?.current?.value && !userName && (
              <>
                <input
                  ref={inputNameRef}
                  className="mb-2.5 h-[44px] w-full rounded border border-slate-300 px-1.5 py-1 text-center font-bold text-black outline-none"
                  placeholder="Nickname"
                  inputMode="numeric"
                  autoComplete="false"
                />
                <button
                  onClick={handleSetName}
                  className="h-[44px] w-full rounded bg-gray-700 px-4 font-bold text-white">
                  OK, go!
                </button>
              </>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}
