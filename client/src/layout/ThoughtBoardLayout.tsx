import { ComponentChild } from "preact";

export default function ThoughtBoardLayout({
  children,
}: {
  children: ComponentChild;
}) {
  return (
    <div className="mx-auto flex h-full w-[96%] max-w-7xl rounded-xl bg-sky-50 p-8">
      {children}
    </div>
  );
}
