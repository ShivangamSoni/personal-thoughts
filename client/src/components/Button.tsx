interface IButtonProps {
  children: string;
  className?: string;
  type?: string;
  onClick?: () => void;
  variant?: "primary" | "circle";
}

export default function Button({
  children,
  className,
  onClick,
  type = "button",
  variant = "primary",
}: IButtonProps) {
  const classes =
    variant === "primary"
      ? "bg-yellow-500 px-4 py-1 font-semibold text-slate-900 hover:rounded-none focus:border-transparent"
      : "flex h-12 w-12 items-center justify-center bg-blue-600 p-[0.5rem!important] text-3xl font-bold text-white hover:rounded-full";
  return (
    <button
      onClick={onClick}
      className={`rounded-full outline-white transition-all delay-[0ms] duration-200 ease-in hover:brightness-125 focus:outline-1 ${classes} ${className}`}
      type={type}
    >
      {children}
    </button>
  );
}
