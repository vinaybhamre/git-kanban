import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex w-full h-screen bg-surface">
      <Sidebar />
      <div className="flex-1">
        <Header />
      </div>
    </div>
  );
}

export default App;
