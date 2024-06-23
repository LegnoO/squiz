"use client";

// ** Next
import { useRouter } from "next-nprogress-bar";

// ** React
import { useEffect } from "react";

// ** Socket
import { socket } from "@/app/socket";



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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>

    </>
  );
}
