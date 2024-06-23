export default function Popper({
  children,
  className,
  width = "w-[15rem]",
}: {
  width?: string;
  className?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <div
        className={`mt-1 popper-animation absolute right-0 top-full z-40 ${width} rounded-md opacity-0 shadow-lg group-hover:opacity-100`}>
        <div className="h-full w-full bg-white transition-all duration-500">
          <div className="">{children}</div>
        </div>
      </div>
    </>
  );
}
