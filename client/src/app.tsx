import { useAuthCtx } from "./Context/AuthContext";
import Header from "./components/Header";
import NewThought from "./components/NewThought";
import ThoughtBoard from "./components/ThoughtBoard";
import ThoughtBoardLayout from "./layout/ThoughtBoardLayout";

export function App() {
  const { user } = useAuthCtx();

  return (
    <div className="grid h-screen grid-rows-[auto,1fr] gap-8 overflow-hidden bg-slate-800 py-8">
      <Header />
      <main className="overflow-auto">
        <ThoughtBoardLayout>
          <ThoughtBoard />
        </ThoughtBoardLayout>
        {user && <NewThought />}
      </main>
    </div>
  );
}
