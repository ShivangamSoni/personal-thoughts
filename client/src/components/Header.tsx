import Button from "./Button";

export default function Header() {
  return (
    <header>
      <div className="mx-auto flex w-[96%] max-w-7xl items-center justify-between rounded-xl bg-rose-700 p-4">
        <h1 className="font-mono text-3xl font-bold text-white">
          Personal Thoughts
        </h1>

        <div className="flex gap-4">
          <Button onClick={() => console.log("Click")}>Login</Button>
          <Button onClick={() => console.log("Click")}>Register</Button>
        </div>
      </div>
    </header>
  );
}