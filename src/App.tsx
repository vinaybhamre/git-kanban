import Board from "./components/Board";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-surface">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <Header />
        <Board />
      </main>
    </div>
  );
}

export default App;
