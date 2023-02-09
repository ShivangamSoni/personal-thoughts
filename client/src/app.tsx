import Header from "./components/Header";
import ThoughtBoard from "./components/ThoughtBoard";
import ThoughtBoardLayout from "./layout/ThoughtBoardLayout";

export function App() {
  return (
    <div className="grid h-screen grid-rows-[auto,1fr] gap-8 overflow-hidden bg-slate-800 py-8">
      <Header />
      <main className="overflow-auto">
        <ThoughtBoardLayout>
          <ThoughtBoard />
        </ThoughtBoardLayout>
      </main>
    </div>
  );
}
