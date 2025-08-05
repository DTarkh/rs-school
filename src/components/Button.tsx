export default function Button({
  children,
  onClick,
  disabled,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className="bg-zinc-700 px-3 rounded-xl text-zinc-200 py-[7px] hover:bg-zinc-600 transition-all cursor-pointer"
    >
      {children}
    </button>
  );
}
