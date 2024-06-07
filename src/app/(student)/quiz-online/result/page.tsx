"use client";

export default function GameResultPage() {
  const personalScore = window.history.state.personalScore;
  return (
    <>
      <div className="flex h-full items-center justify-center">
        <div className="grid place-items-center gap-4">
          <div className="text-2xl font-bold text-black">
            Điểm của bạn
          </div>
          <div className="font-bold text-black">{personalScore}</div>
        </div>
      </div>
    </>
  );
}
