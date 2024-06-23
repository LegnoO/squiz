"use client";

// ** Hooks
import { useRouter } from "next-nprogress-bar";

// ** Components
import { Navbar } from "@/components/ui/Nav";

export default function GameResultPage() {
  const router = useRouter();
  const personalScore = window.history.state.personalScore;

  function handleExistPage() {
    router.push("/quiz-online/join");
  }

  return (
    <div className="flex h-full flex-col gap-8">
      <Navbar>
        <div className="flex flex-1 items-center justify-between">
          <div></div>
          <button onClick={handleExistPage} className="flex items-center gap-2 rounded border border-[--border-primary-main] bg-[--background-primary-main] p-2 transition duration-200 hover:bg-gray-100">
            <span className="font-medium">Tiếp theo</span>
          </button>
        </div>
      </Navbar>
      <div className="flex flex-1 items-center justify-center">
        <div className="grid place-items-center gap-4">
          <div className="text-2xl font-bold text-black">Điểm của bạn</div>
          <div className="font-bold text-black">{personalScore}</div>
        </div>
      </div>
    </div>
  );
}
