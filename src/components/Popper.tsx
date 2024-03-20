export default function Popper({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <div
        className={`popper-animation absolute right-0 top-full z-40 w-[15rem] rounded-md opacity-0 shadow-lg group-hover:opacity-100`}>
        <div className="h-full w-full bg-white transition-all duration-500">
          <div className="py-3">{children}</div>
        </div>
      </div>
    </>
  );
}
