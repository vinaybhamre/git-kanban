import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

function BoardLayout() {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-surface">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <Header />
        {<Outlet />}
      </main>
    </div>
  );
}

export default BoardLayout;
