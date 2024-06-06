"use client";

// ** Nextjs
import { useRouter, useSearchParams } from "next/navigation";

// ** React
import { useState, useEffect, useRef, MouseEvent } from "react";

// ** Socket
import { socket } from "@/app/socket";
import Loading from "@/components/Loading";

export default function JoinPage() {
  const router = useRouter();
  const inputPinRef = useRef<HTMLInputElement>(null);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userData = JSON.parse(localStorage.getItem("userDatas")!) || "";
  const userEmail = userData.email;
  const [userName, setUserName] = useState<string>(
    userEmail ? userEmail.split("@")[0] : "",
  );
  const [roomId, setRoomId] = useState<string>("");

  function joinRoom() {
    socket.emit("joinRoom", {
      roomId,
      userName,
    });
  }

  function handleSetRoom(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    setRoomId(inputPinRef?.current?.value as string);
  }

  function handleSetName(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    setUserName(inputNameRef?.current?.value as string);
  }

  function handleSubmit() {
    setIsLoading(true);
    window.history.pushState({ userName }, "", null);
    router.push(`instructions/${roomId}`);
  }


  useEffect(() => {
    socket.connect();
  }, []);

  useEffect(() => {
    if (userName && roomId) {
      joinRoom();
      handleSubmit();
    }
  }, [userName, roomId]);

  return (
    <div className="h-full w-full">
      <div className="flex h-full items-center justify-center">
        <main className="max-w-[320px] text-center">
          <h2 className="mb-4 text-3xl font-bold">Squiz</h2>
          <form
            className={`rounded ${isLoading ? "bg-transparent" : "bg-white"} p-4 shadow`}>
            {isLoading && <Loading />}
            {!roomId && (
              <>
                <input
                  ref={inputPinRef}
                  className="mb-2.5 h-[44px] w-full rounded border border-slate-300 px-1.5 py-1 text-center font-bold text-black outline-none"
                  placeholder="Game PIN"
                  autoComplete="false"
                />
                <button
                  onClick={handleSetRoom}
                  className="h-[44px] w-full rounded bg-gray-700 px-4 font-bold text-white">
                  Enter
                </button>
              </>
            )}

            {roomId && !userName && (
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
