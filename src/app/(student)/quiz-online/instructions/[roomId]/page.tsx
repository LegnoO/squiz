"use client";

// ** Next
import { useRouter } from "next/navigation";

// ** React
import { useEffect } from "react";

// ** Socket
import { socket } from "@/app/socket";

// ** Utils
import { processName } from "@/utils/processName";

export default function InstructionsPage({
  params,
}: {
  params: { roomId: string };
}) {
  
  const router = useRouter();
  useEffect(() => {
    socket.on("countdown", (countdown) => {
      if (countdown) {
        router.push(`/quiz-online/gameblock/${params.roomId}`);
      }
    });

  }, []);

  return (
    <>
      <div className="h-full w-full">
        <div className="flex h-full items-center justify-center">
          <main className="max-w-[320px] text-center">
            <div className="grid place-items-center gap-4">
              <div className="justify-content flex h-[50px] w-[50px] items-center rounded-full bg-gray-200">
                <p className="w-full text-2xl">{processName("test")}</p>
              </div>
              <div className="text-2xl font-bold">test</div>
            </div>
            <div className="mt-3 text-base font-bold">
              You are in! See your nickname on screen?
            </div>

            {/* {window.history.state.userName} */}
          </main>
        </div>
      </div>
    </>
  );
}
