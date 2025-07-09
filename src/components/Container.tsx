export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[500px] h-[600px] bg-zinc-300 p-7 flex flex-col items-center justify-between gap-7">
      {children}
    </div>
  );
}
