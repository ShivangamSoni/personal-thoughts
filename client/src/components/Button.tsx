interface IButtonProps {
  children: string;
  className?: string;
  onClick: () => void;
}

export default function Button({ children, className, onClick }: IButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-yellow-500 px-4 py-1 font-semibold text-slate-900 outline-white transition-all delay-[0ms] duration-200 ease-in hover:rounded-none hover:brightness-125 focus:border-transparent focus:outline-1 ${className}`}
    >
      {children}
    </button>
  );
}
